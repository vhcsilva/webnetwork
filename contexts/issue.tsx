import React, {
  createContext,
  useCallback, useContext, useEffect, useMemo, useState
} from "react";

import { useRouter } from "next/router";

import { useAuthentication } from "contexts/authentication";
import { useNetwork } from "contexts/network";

import { BountyExtended, ProposalExtended } from "interfaces/bounty";
import {
  IssueData,
  pullRequest,
  IssueDataComment
} from "interfaces/issue-data";

import { BeproService } from "services/bepro-service";

import useApi from "x-hooks/use-api";
import useOctokitGraph from "x-hooks/use-octokit-graph";


export interface IActiveIssue extends IssueData {
  comments: IssueDataComment[];
  lastUpdated: number;
}
const TTL = 60 * 2 * 100; // 2 Min
export interface IssueContextData {
  activeIssue: IActiveIssue;
  networkIssue: BountyExtended;
  updateIssue: (repoId: string | number, ghId: string | number) => Promise<IActiveIssue>;
  addNewComment: (prId: number, comment: string) => void;
  getNetworkIssue: () => void;
}

const IssueContext = createContext<IssueContextData>({} as IssueContextData);

export const IssueProvider: React.FC = function ({ children }) {
  const [activeIssue, setActiveIssue] = useState<IActiveIssue>();
  const [networkIssue, setNetworkIssue] = useState<BountyExtended>();

  const { getIssue } = useApi();
  const { activeNetwork } = useNetwork();
  const { query } = useRouter();

  const { getIssueOrPullRequestComments, getPullRequestDetails } = useOctokitGraph();

  const { wallet, user, beproServiceStarted } = useAuthentication();

  const addNewComment = useCallback((prId: number, comment: string) => {
    const pullRequests = [...activeIssue.pullRequests];
    const prIndex = pullRequests.findIndex((pr) => pr.id === prId);
    const newPr = {
        ...pullRequests[prIndex],
        comments: [...pullRequests[prIndex].comments, comment]
    } as pullRequest;
    pullRequests[prIndex] = newPr;
    setActiveIssue((oldState) => ({ ...oldState, pullRequests }));
  },
    [activeIssue]);

  const updatePullRequests = useCallback(async (prs: pullRequest[], githubPath: string) => {
    const mapPr = prs.map(async (pr) => {
      const [getPr, getComments] = await Promise.all([
        getPullRequestDetails(githubPath, +pr.githubId),
        getIssueOrPullRequestComments(githubPath, +pr.githubId)
      ]);
      pr.isMergeable = getPr?.mergeable === "MERGEABLE";
      pr.merged = getPr?.merged;
      pr.state = getPr?.state;
      pr.comments = getComments as any;
      return pr;
    });

    return Promise.all(mapPr);
  }, [user?.accessToken]);

  const updateIssue = useCallback(async (repoId: string | number, ghId: string | number): Promise<IActiveIssue> => {
    if (!activeNetwork?.name) return;

    const issue = await getIssue(repoId, ghId, activeNetwork?.name);
    
    if (!issue) throw new Error("Issue not found");

    const ghPath = issue.repository.githubPath;

    if (issue?.pullRequests?.length > 0) {
      issue.pullRequests = await updatePullRequests(issue?.pullRequests,
                                                    ghPath);
    }

    const comments = await getIssueOrPullRequestComments(ghPath, +issue.githubId);
    
    const newActiveIssue = {
        ...issue,
        comments,
        mergeProposals: issue.mergeProposals.map(mp => 
          ({...mp, isMerged: issue.merged !== null && +mp.scMergeId === +issue.merged})),
        lastUpdated: +new Date()
    } as IActiveIssue;

    setActiveIssue(newActiveIssue);

    return newActiveIssue;
  },
    [activeNetwork, query?.repoId, query?.id, user?.accessToken]);

  const getNetworkIssue = useCallback(async () => {
    if (!wallet?.address || !activeIssue?.contractId || !beproServiceStarted)
      return;

    const bounty = await BeproService.getBounty(activeIssue?.contractId);

    const isFinished = bounty?.pullRequests?.some(pullRequest => pullRequest.ready && !pullRequest.canceled);

    let isDraft = null;

    try {
      isDraft = await BeproService.network.isBountyInDraft(bounty.id);
    } catch (error) {
      console.error(error);
    }
    const networkProposals: ProposalExtended[] = [];

    for (const proposal of bounty.proposals) {
      const isDisputed = activeIssue?.merged
        ? +activeIssue?.merged !== +proposal.id
        : await BeproService.network.isProposalDisputed(+bounty.id, +proposal.id);

      const isDisputedByAddress = await BeproService.network.disputes(wallet.address, bounty.id, proposal.id) > 0;

      networkProposals[+proposal.id] = {
        ...proposal,
        isDisputed,
        canUserDispute: !isDisputedByAddress
      };
    }

    setNetworkIssue({ 
      ...bounty, 
      isDraft, 
      pullRequests: bounty.pullRequests.filter(pr => !pr.canceled),
      proposals: networkProposals,
      isFinished
    });
    return { ...bounty, isDraft, networkProposals };
  }, [activeIssue, wallet?.address, beproServiceStarted]);

  useEffect(() => {
    if (activeIssue && wallet?.address && beproServiceStarted) {
      getNetworkIssue();
    }
  }, [activeIssue, wallet?.address, beproServiceStarted]);

  useEffect(() => {    
    const noExpired = +new Date() - activeIssue?.lastUpdated <= TTL;

    if (query.id && query.repoId) {
      if (
        query.id !== activeIssue?.githubId ||
        +query.repoId !== +activeIssue?.repository_id || !noExpired
      ) {
        setActiveIssue(null);
        updateIssue(`${query.repoId}`, `${query.id}`);
      }
    }
  }, [query, activeNetwork, user?.accessToken]);

  const memorizeValue = useMemo<IssueContextData>(() => ({
      activeIssue,
      networkIssue,
      addNewComment,
      updateIssue,
      getNetworkIssue
  }),
    [activeIssue, networkIssue, addNewComment, updateIssue, getNetworkIssue]);

  return (
    <IssueContext.Provider value={memorizeValue}>
      {children}
    </IssueContext.Provider>
  );
};

export function useIssue(): IssueContextData {
  const context = useContext(IssueContext);

  if (!context) {
    throw new Error("useIssue must be used within an IssueProvider");
  }

  return context;
}