import { signalActivationsService } from "./signal-activations.service";

export const signalActivationsFacade = {
  list: signalActivationsService.list,
};
