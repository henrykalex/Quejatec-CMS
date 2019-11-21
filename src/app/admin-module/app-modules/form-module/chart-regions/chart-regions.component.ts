import { Component, OnInit, OnChanges, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

export function createArrayLengthValidator() {
  return (c: FormControl) => {
    let err = {
      lengthError: {
        given: c.value.length,
      }
    };
    if(c.value.length < 0 )
    return  err;
    if(c.value.length >= 1 )
    for(let val of c.value){
      if(!val.name  || !val.value)
      return err;
    }
    return null;
  }
}

@Component({
  selector: 'app-chart-regions',
  templateUrl: './chart-regions.component.html',
  styleUrls: ['./chart-regions.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChartRegionsComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ChartRegionsComponent), multi: true }
  ]
})
export class ChartRegionsComponent implements OnInit, ControlValueAccessor {
  _regionsList: any[] = [];
  get regionsList():any[] {
    return this._regionsList;
  }
  set regionsList(val:any[]) {
    this._regionsList = val;
    this.propagateChange(val);
  }

  propagateChange:any = () => {};
  validateFn:any = () => {};
  constructor() { }

  ngOnInit() {
    this.validateFn = createArrayLengthValidator();
  }

  ///// Custom formControl
    ngOnChanges(inputs) {
    if(inputs.length){
      this.validateFn = createArrayLengthValidator();
      this.propagateChange(this.regionsList);
    }
      // if (inputs.counterRangeMax || inputs.counterRangeMin) {
      //   this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
      //   this.propagateChange(this.counterValue);
      // }
    }

    writeValue(value) {
      if (value) {
        this.regionsList = this.copy(value);
      }
    }

    copy(o) {
       var output, v, key;
       output = Array.isArray(o) ? [] : {};
       for (key in o) {
           v = o[key];
           output[key] = (typeof v === "object") ? this.copy(v) : v;
       }
       return output;
    }

    registerOnChange(fn) {
      this.propagateChange = fn;
    }

    registerOnTouched() {}

    validate(c: FormControl) {
      return this.validateFn(c);
    }
    ////////

    trackByIdx(index: number, obj: any): any {
      return index;
    }
    addNewRegion(event){
      event.preventDefault();
      this.regionsList.push({name:'',value:0});
      this.regionsList = this.regionsList;
    }
    elementChange(change, index, field){
      // console.log("elementChange",change,index);
      this.regionsList[index][field] = change;
      this.regionsList = this.regionsList;
    }
    deleteRegion(index){
      this.regionsList.splice(index,1);
      this.regionsList = this.regionsList;
    }
}
