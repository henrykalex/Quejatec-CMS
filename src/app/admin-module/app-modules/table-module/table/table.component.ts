import {
  Component, AfterViewInit, OnChanges, ViewChild, Input, Output,
  EventEmitter, ChangeDetectorRef, ViewEncapsulation, SimpleChanges, SimpleChange
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Observable } from 'rxjs';
import { merge, of as observableOf, from } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime, tap, filter } from 'rxjs/operators';

import { RequestTableOptions, ResponseTableItems, ColumnDef, FilterDef } from '../Table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements AfterViewInit, OnChanges {
  //// :::::::: FILTERS & SEARCH ::::::::: ////
  @Input() filters: FilterDef[];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  //// :::::::: SOURCE ::::::::: ////
  @Input() source: any[];
  //// :::::::: SOURCE FUNCTION ::::::::: ////
  @Input() sourceFunction: (options: RequestTableOptions) => Observable<ResponseTableItems>;
  //// :::::::: COLUMNS ::::::::: ////
  @Input() columns: ColumnDef[];

  displayedColumns: string[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isError = false;

  //// :::::::: VIEW CONTROL ::::::::: ////
  @Input() viewButton: boolean;
  @Input() deleteText = 'ELIMINAR';
  @Input() deleteButton: boolean;
  @Input() hideSearch: boolean;
  @Input() hideAddButton: boolean;
  @Input() addLabel = 'AGREGAR NUEVO';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() reset: boolean;
  @Input() checkBox: boolean;

  //// :::::::: EVENTS CONTROL ::::::::: ////
  @Output() addItem: EventEmitter<true> = new EventEmitter<true>();
  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  //// :::::::: PRIVATE ::::::::: ////
  searchFormControl: FormControl = new FormControl();
  isSearching: boolean;
  filterFormControl: FormControl = new FormControl();
  tableSwitchMapFunction: (item) => Observable<any>;
  tableMapFunction: (data) => any;
  tableErrorFunction: (error) => any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.tableSwitchMapFunction = (item) => {
      this.isLoadingResults = true;
      // console.log('sort pag detacted',item,!!this.sourceFunction);
      const filterField = this.getFilterField(this.filterFormControl.value);
      // console.log('filterField',filterField,this.filterFormControl.value);
      // console.log('this.sourceFunction',this.sourceFunction);
      const returnFunction = this.sourceFunction ?
        this.sourceFunction({
          sort: this.sort.active,
          order: this.sort.direction,
          page: this.paginator.pageIndex,
          query: this.searchFormControl.value ? this.searchFormControl.value : null,
          filter: filterField ? { field: filterField, value: this.filterFormControl.value } : null,
        }) : from([{
          items: this.source ? this.source : [],
          totalCount: this.resultsLength ? this.resultsLength : 0
        }]);
      // console.log('returnFunction',returnFunction);
      return returnFunction;
    };
    this.tableMapFunction = (data) => {
      // console.log('tableMapFunction',data);
      this.isLoadingResults = false;
      this.isError = false;
      this.resultsLength = data.totalCount;
      return data.items;
    };
    this.tableErrorFunction = (error) => {
      // console.log('tableError - ',error);
      this.isLoadingResults = false;
      this.isError = true;
      return observableOf([]);
    };
  }

  ngAfterViewInit() {
    // console.log('table ngOnInit');
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.page.subscribe((page) => console.log('page', page));
    this.subscribeMerge();
    this.subscribeSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    const filters = changes.filters ? (changes.filters as SimpleChange).currentValue : null;
    const source = changes.source ? (changes.source as SimpleChange).currentValue : null;
    const sourceFunction = changes.sourceFunction ? (changes.sourceFunction as SimpleChange).currentValue : null;
    const columns = changes.columns ? (changes.columns as SimpleChange).currentValue : null;
    const viewButton = changes.viewButton ? (changes.viewButton as SimpleChange).currentValue : null;
    const deleteButton = changes.deleteButton ? (changes.deleteButton as SimpleChange).currentValue : null;
    const reset = changes.reset ? (changes.reset as SimpleChange).currentValue : null;
    const checkBox = changes.checkBox ? (changes.checkBox as SimpleChange).currentValue : null;

    if (filters) {
      this.subscribeFilter();
    }
    if (source) {
      // console.log('thi.source',this.source);
      this.resultsLength = this.source.length;
      // console.log('thi.resultsLength',this.resultsLength);
      this.dataSource.data = this.source;
      // console.log('Input this.dataSource1',this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRef.detectChanges();
      // console.log('Input this.dataSource2',this.dataSource);
    }

    if (sourceFunction) {
      // console.log('this._sourceFunction',this._sourceFunction);
      if (this.dataSource) { // Data need to resync
        // console.log('this.dataSource',this.dataSource);
        // console.log('this.filters',this.filters);
        if (this.sourceFunction && !this.filters) {
          this.sourceFunction({ page: 0 }).subscribe(data => {
            // console.log('data',data);
            this.dataSource.data = data.items;
            this.resultsLength = data.totalCount;
          });
        }
      }
    }

    if (columns) {
      this.displayedColumns = this.displayedColumns.concat(this.columns.map(value => value.key));
    }

    if (viewButton) {
      this.displayedColumns.splice(this.displayedColumns.length, 0, 'view');
    }
    if (deleteButton) {
      this.displayedColumns.splice(this.displayedColumns.length, 0, 'delete');
    }
    if (reset) {
      this.reloadData();
    }
    if (checkBox) {
      this.displayedColumns.unshift('checkBox');
      this.subscribeSelection();
    }

  }

  subscribeMerge() {
    // console.log('subscribeMerge');
    merge(this.sort.sortChange, this.paginator.page).pipe(
      // tap(()=>console.log('subscribeMerge tap')),
      // filter(()=>!this.isSearching),
      startWith({}),
      switchMap(this.tableSwitchMapFunction),
      map(this.tableMapFunction),
      catchError(this.tableErrorFunction)
    ).subscribe(data => {
      // console.log('data',data);
      this.dataSource.data = this.source ? this.source : data;
    });
  }

  reloadData() {
    if (this.sourceFunction) {
      this.searchFormControl.reset();
      const filterField = this.getFilterField(this.filterFormControl.value);
      this.sourceFunction({
        sort: this.sort.active,
        order: this.sort.direction,
        page: this.paginator.pageIndex,
        filter: filterField ? { field: filterField, value: this.filterFormControl.value } : null,
      }).subscribe(data => {
        // console.log('data',data);
        this.isLoadingResults = false;
        this.isError = false;
        this.resultsLength = data.totalCount;
        this.dataSource.data = data.items;
      });
    }
  }

  resetSortAndPaginator() {
    // console.log('resetSortAndPaginator',!!this.paginator.pageIndex);
    if (this.sort.active) {
      this.sort.sort({
        id: '',
        start: 'asc',
        disableClear: false,
      });
    }
    if (!!this.paginator.pageIndex) {
      this.paginator.pageIndex = 0;
    }
  }
  subscribeSearch() {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(400),
      tap((item) => {
        this.resetSortAndPaginator();
        this.isSearching = true;
      }),
      switchMap(this.tableSwitchMapFunction),
      map(this.tableMapFunction),
      catchError(this.tableErrorFunction)
    ).subscribe(data => {
      // console.log('data',data);
      this.isSearching = false;
      if (this.sourceFunction) {
        this.dataSource.data = data;
      } else {
        this.dataSource.filter = this.searchFormControl.value;
      }
    });
  }
  subscribeFilter() {
    if (this.filters) {
      if (this.filters.length > 0) {
        this.filterFormControl.setValue(this.filters[0].value);
      }
    }
    this.filterFormControl.valueChanges.pipe(
      tap((item) => this.resetSortAndPaginator()),
      switchMap(this.tableSwitchMapFunction),
      map(this.tableMapFunction),
      catchError(this.tableErrorFunction)
    ).subscribe(data => {
      // console.log('data',data);
      if (this.sourceFunction) {
        this.dataSource.data = data;
      } else {
        this.dataSource.filter = this.searchFormControl.value;
      }
    });
  }

  // Checkbox functions
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkBoxClick(event, row) {
    // console.log('checkBoxClick',event);
    if (row && event) {
      this.selection.toggle(row);
    }
    if (!row && event) {
      this.masterToggle();
    }
  }
  subscribeSelection() {
    this.selection.changed.subscribe(values => {
      // console.log('this.selection.selected',this.selection.selected);
      this.selectionChange.emit(this.selection.selected);
    });
  }

  getFilterField(filterValue) {
    // console.log('getFilterField',filterValue);
    if (!filterValue) {
      return null;
    }
    const filterD = this.filters.find(flt => flt.value === filterValue);
    // console.log('filter',filter);
    return filterD ? filterD.field : null;
  }
}
