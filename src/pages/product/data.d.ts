export interface TableListItem {
  key: string;
  no: string;
  name: string;
  time: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}

export interface ProductItem {
  fprFlowNo: string;
  fprProname: string;
  fprProtype: string;
  fprFinanceId: string;
  fprFinanceName: string;
  fprUserNo: string;
  fprPropath: null;
  fprLoanDate: string;
  fprLoanDateTo: string;
  succRate: string;
  fprBeginrate: string;
  fprEndrate: string;
  fprLoanAmt: string;
  fprLoanAmtTo: string;
  countEnt: string;
  fprLoanPurpose: string;
  fprFlow: string;
}

export interface TypeItem {
  title?: string;
  id?: any;
  isCal?: any;
  key?: string;
}
