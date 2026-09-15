import { identityService } from "./identity.service";

export const identityFacade = {
  list: identityService.list,
};
