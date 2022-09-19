import { DataSourceOptionsContract } from "./data-source-options.contract";

export interface DataSourceContract{
  question?: string;
  options?: DataSourceOptionsContract[];
}
