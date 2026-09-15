import { complaintCasesService } from "./complaint-cases.service";

export const complaintCasesFacade = {
  list: complaintCasesService.list,
};
