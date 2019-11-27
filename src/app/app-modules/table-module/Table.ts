import { HttpParams } from '@angular/common/http';

export interface RequestTableOptions {
  sort?: string;
  order?: string;
  query?: string;
  filter?: { field: string, value: string };
  page: number;
}
export interface ResponseTableItems {
  items: any[];
  totalCount: number;
}

export interface ColumnDef {
  label: string;
  key: string;
  pipe?: string;
  filter?: (value) => any;
  map?: any;
  sort?: boolean;
}

export interface FilterDef {
  label: string;
  value: string;
  field: string;
}

export function getTableHttpParams(options: RequestTableOptions) {
  let newParams = new HttpParams();
  newParams = options.page !== undefined ? newParams.append('page', (options.page + 1) + '') : newParams;
  newParams = options.filter ? newParams.append('filter', options.filter.value + '') : newParams;
  newParams = options.filter ? newParams.append('field', options.filter.field + '') : newParams;
  newParams = options.query ? newParams.append('q', options.query + '') : newParams;
  newParams = options.sort && options.order ? newParams.append('order', options.order + '') : newParams;
  newParams = options.sort ? newParams.append('sort', options.sort + '') : newParams;
  return newParams;
}
