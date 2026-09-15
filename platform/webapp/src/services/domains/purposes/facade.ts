import { purposesService } from "./purposes.service";

export const purposesFacade = {
  list: purposesService.list,
};
