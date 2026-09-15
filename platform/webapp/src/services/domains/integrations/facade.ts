import { integrationsService } from "./integrations.service";

export const integrationsFacade = {
  list: integrationsService.list,
};
