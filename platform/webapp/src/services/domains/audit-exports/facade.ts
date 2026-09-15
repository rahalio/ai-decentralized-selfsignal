import { auditExportsService } from "./audit-exports.service";

export const auditExportsFacade = {
  list: auditExportsService.list,
};
