import { rightsRequestsService } from "./rights-requests.service";

export const rightsRequestsFacade = {
  list: rightsRequestsService.list,
};
