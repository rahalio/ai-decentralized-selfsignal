import { vaultProfilesService } from "./vault-profiles.service";

export const vaultProfilesFacade = {
  list: vaultProfilesService.list,
};
