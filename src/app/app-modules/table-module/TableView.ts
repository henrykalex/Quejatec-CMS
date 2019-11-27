import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ColumnDef, FilterDef, RequestTableOptions, ResponseTableItems } from './Table';

export interface TableViewOptions {
  columnsDefinition: ColumnDef[];
  tableFunction: (options: RequestTableOptions) => Observable<ResponseTableItems>;
  routeName: string;
  addLabel?: string;
  filtersDefinition?: FilterDef[];
}

export class TableView {
  columnsDefinition: ColumnDef[];
  tableFunction: (options: RequestTableOptions) => Observable<ResponseTableItems>;
  filtersDefinition: FilterDef[];
  addLabel: string;
  routeName: string;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    options: TableViewOptions,
  ) {
    // Required
    this.columnsDefinition = options.columnsDefinition;
    this.tableFunction = options.tableFunction;
    this.routeName = options.routeName;
    // Optional
    this.filtersDefinition = options.filtersDefinition || [] as FilterDef[];
    this.addLabel = options.addLabel || '';
  }

  addNewItem() {
    // console.log('this.routeName', this.routeName);
    this.router.navigate(['..', this.routeName], { relativeTo: this.activatedRoute });
  }
  viewItem(item) {
    // console.log('viewItem', item);
    this.router.navigate(['..', this.routeName, item._id], { relativeTo: this.activatedRoute });
  }

}
