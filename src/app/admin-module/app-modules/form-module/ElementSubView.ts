import { Observable } from 'rxjs';
import { AppService } from '../app-services-module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export class ElementSubView {
  elementQuestions: any[];
  partialElementQuestions: any[];

  elementId: string;
  parentElementId: string;

  // elementBackRoute: string; // Used for cancel button
  elementNewRoute: string; // Used for new element

  elementDataPRiv: any;
  set elementData(value: any) {
    this.elementDataPRiv = value;
    if (value) {
      if (this.onElementDataLoad) {
        this.onElementDataLoad(value);
      }
    }
  }
  get elementData(): any {
    return this.elementDataPRiv;
  }

  elementPostServiceFn: (id: string, data: any) => Observable<any>;
  elementGetServiceFn: (id: string, subId: string) => Observable<any>;
  elementUpdateServiceFn: (id: string, subId: string, value: any) => Observable<any>;
  elementDeleteServiceFn: (id: string, subId: string) => Observable<any>;

  onElementDataLoad: (elementData: any) => void;

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    options: {
      elementQuestions: any,
      partialElementQuestions: any[],

      // elementBackRoute: string,
      elementNewRoute: string,

      elementPostServiceFn: (id: string, data: any) => Observable<any>,
      elementGetServiceFn: (id: string, subId: string) => Observable<any>,
      elementUpdateServiceFn: (id: string, subId: string, value: any) => Observable<any>,
      elementDeleteServiceFn: (id: string, subId: string) => Observable<any>,
    }
  ) {
    this.elementQuestions = options.elementQuestions;
    this.partialElementQuestions = options.partialElementQuestions;
    // this.elementBackRoute = options.elementBackRoute;
    this.elementNewRoute = options.elementNewRoute;
    this.elementPostServiceFn = options.elementPostServiceFn;
    this.elementGetServiceFn = options.elementGetServiceFn;
    this.elementUpdateServiceFn = options.elementUpdateServiceFn;
    this.elementDeleteServiceFn = options.elementDeleteServiceFn;

    this.getParams();
  }

  getParams() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const parentElementId = paramMap.get('id');
      const elementId = paramMap.get('subId');
      console.log('parentElementId,elementId', parentElementId, elementId);
      this.parentElementId = parentElementId;
      this.elementId = elementId;
      if (this.elementId) {
        this.getElementData();
      } else {
        if (this.partialElementQuestions) {
          this.elementQuestions = this.partialElementQuestions;
        }
      }
    });
  }
  getElementData() {
    this.elementGetServiceFn(this.parentElementId, this.elementId)
      .subscribe(elementData => {
        if (elementData) {
          this.elementData = elementData;
        }
      });
  }

  submitForm(value: any) {
    return this.elementId ? this.updateElement(value) : this.addNewElement(value);
  }
  addNewElement(elementData: any) {
    // console.log('addNewElement');
    this.elementPostServiceFn(this.parentElementId, elementData).subscribe(element => {
      this.router.navigate(['..', this.elementNewRoute, element._id], { relativeTo: this.activatedRoute });
    });
  }
  updateElement(value: any) {
    this.elementUpdateServiceFn(this.parentElementId, this.elementId, value).subscribe(element => {
      if (element) {
        this.elementData = element;
      }
    });
  }

  deleteElement() {
    this.elementDeleteServiceFn(this.parentElementId, this.elementId)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
        }
      });
  }

}
