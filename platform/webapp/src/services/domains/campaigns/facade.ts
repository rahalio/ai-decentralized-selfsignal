import { campaignsService } from "./campaigns.service";

export const campaignsFacade = {
  list: campaignsService.list,
};
