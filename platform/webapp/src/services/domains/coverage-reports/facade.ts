import { coverageReportsService } from "./coverage-reports.service";

export const coverageReportsFacade = {
  list: coverageReportsService.list,
};
