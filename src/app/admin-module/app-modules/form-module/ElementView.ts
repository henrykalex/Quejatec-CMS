import { Observable } from 'rxjs';
import { AppService } from '../app-services-module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


export class ElementView {
  elementQuestions: any[];
  partialElementQuestions: any[];

  elementId: string;

  elementBackRoute: string; // Used for cancel button
  elementNewRoute: string; // Used for new element

  private elementDataPRiv: any;
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

  elementPostServiceFn: (data: any) => Observable<any>;
  elementGetServiceFn: (id: string) => Observable<any>;
  elementUpdateServiceFn: (id: string, value: any) => Observable<any>;
  elementDeleteServiceFn: (id: string) => Observable<any>;

  onElementDataLoad: (elementData: any) => void;

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    options: {
      elementQuestions: any[],
      partialElementQuestions?: any[],

      elementBackRoute: string,
      elementNewRoute: string,

      elementPostServiceFn?: (data: any) => Observable<any>,
      elementGetServiceFn: (id: string) => Observable<any>,
      elementUpdateServiceFn: (id: string, value: any) => Observable<any>,
      elementDeleteServiceFn?: (id: string) => Observable<any>,
    }
  ) {
    this.elementQuestions = options.elementQuestions;
    this.partialElementQuestions = options.partialElementQuestions;
    this.elementBackRoute = options.elementBackRoute;
    this.elementNewRoute = options.elementNewRoute;
    this.elementPostServiceFn = options.elementPostServiceFn;
    this.elementGetServiceFn = options.elementGetServiceFn;
    this.elementUpdateServiceFn = options.elementUpdateServiceFn;
    this.elementDeleteServiceFn = options.elementDeleteServiceFn;

    this.getParams();
  }

  getParams() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const elementId = paramMap.get('id');
      // console.log("elementId",elementId);
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
    this.elementGetServiceFn(this.elementId)
      .subscribe(elementData => {
        if (elementData) {
          this.elementData = elementData;
        }
      });
  }

  submitForm(value: any) {
    return this.elementId ? this.updateElement(value) : this.addNewElement(value);
  }

  addNewElement(value: any) {
    // console.log("addNewElement",event);
    if (this.elementPostServiceFn) {
      this.elementPostServiceFn(value).subscribe(element => {
        if (element) {
          this.router.navigate(['..', this.elementNewRoute, element._id], { relativeTo: this.activatedRoute });
        }
      });
    }
  }

  setStatus(status: string) {
    this.updateElement({ status });
  }

  updateElement(value: any) {
    this.elementUpdateServiceFn(this.elementId, value).subscribe(element => {
      if (element) {
        this.elementData = element;
      }
    });
  }

  deleteElement() {
    if (this.elementDeleteServiceFn) {
      this.elementDeleteServiceFn(this.elementId)
        .subscribe(success => {
          if (success) {
            this.goBack();
          }
        });
      }
  }

  goBack() {
    this.router.navigate(['../..', this.elementBackRoute], { relativeTo: this.activatedRoute });
  }
}
