import StartWorkingButton from "components/bounty/page-actions/actions/start-working.view";
import MultiActionButton from "components/common/buttons/multi-action/view";
import ConnectGithub from "components/connect-github";

import { Action } from "types/utils";

interface TabletAndMobileButtonProps {
  isCreatePr: boolean;
  isCreateProposal: boolean;
  isExecuting: boolean;
  isConnectGithub: boolean;
  isStartWorkingButton: boolean;
  handleActionWorking: () => void;
  handleShowPRModal: (b: boolean) => void;
  handleShowPRProposal: (b: boolean) => void;
}

export default function TabletAndMobileButton({
  isCreatePr,
  isCreateProposal,
  isExecuting,
  isConnectGithub,
  isStartWorkingButton,
  handleActionWorking,
  handleShowPRModal,
  handleShowPRProposal,
}: TabletAndMobileButtonProps) {
  const actions: Action[] = [];

  if (isCreatePr)
    actions.push({
      label: "Pull Request",
      onClick: () => handleShowPRModal(true),
    });

  if (isCreateProposal)
    actions.push({
      label: "Proposal",
      onClick: () => handleShowPRProposal(true),
    });

  if (isConnectGithub)
    return <ConnectGithub size="lg" />;

  if (isCreatePr || isCreateProposal)
    return (
      <MultiActionButton label="Create" className="col-12" actions={actions} />
    );

  if(isStartWorkingButton){
    return (
      <StartWorkingButton
        onClick={handleActionWorking}
        isExecuting={isExecuting}
      />
    )
  }else return null;
}
