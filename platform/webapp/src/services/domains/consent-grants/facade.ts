import { consentGrantsService } from "./consent-grants.service";

export const consentGrantsFacade = {
  list: consentGrantsService.list,
};
