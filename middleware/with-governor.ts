import { NextApiHandler } from "next";

import { governorRole } from "helpers/api";
import { NOT_AN_CREATOR_NETWORK } from "helpers/constants";

import { Logger } from "services/logging";

import { isMethodAllowed } from "server/utils/http";

Logger.changeActionName(`withGovernor()`);

export const withGovernor = (handler: NextApiHandler, allowedMethods = ["GET"]): NextApiHandler => {
  return async (req, res) => {
    if (isMethodAllowed(req.method, allowedMethods))
      return handler(req, res);

    const roles = req.body?.context?.token?.roles || [];
    const chain = req.body?.context?.chain || [];
    const networkAddress = req.body?.networkAddress;

    if (!roles.includes(governorRole(chain?.chainId, networkAddress)))
      return res.status(401).json({ message: NOT_AN_CREATOR_NETWORK });

    return handler(req, res);
  }
}