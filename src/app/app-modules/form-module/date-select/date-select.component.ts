import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, OnInit, AfterViewInit, OnChanges, OnDestroy, Input, ElementRef, HostListener, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

export class MyDate {
  constructor(public date: Date) { }
}

export function createDateValidator() {
  return (c: FormControl) => {
    // console.log('c', c);
    const err = {
      requiredError: {
        given: c.value,
      }
    };
    return (!c.value) ? err : null;
  };
}

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: DateSelectComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateSelectComponent), multi: true },
  ]
})
export class DateSelectComponent implements AfterViewInit, OnChanges, MatFormFieldControl<MyDate>, OnDestroy, ControlValueAccessor {
  static nextId = 0;
  @HostListener('[class.example-floating]') shouldLabelFloat;
  @HostListener('[id]') id;
  @HostListener('[attr.aria-describedby]') describedBy;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  ngControl = null;
  errorState = false;
  controlType = 'app-date-select';


  get empty() {
    const { value: { date } } = this.parts;
    return !date;
  }

  private placeholderPriv: string;
  @Input()
  get placeholder(): string { return this.placeholderPriv; }
  set placeholder(value: string) {
    this.placeholderPriv = value;
    this.stateChanges.next();
  }

  private requiredPriv = false;
  @Input()
  get required(): boolean { return this.requiredPriv; }
  set required(value: boolean) {
    this.requiredPriv = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private disabledPriv = false;
  @Input()
  get disabled(): boolean { return this.disabledPriv; }
  set disabled(value: boolean) {
    this.disabledPriv = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get value(): MyDate | null {
    const { value: { date } } = this.parts;
    return new MyDate(date);
  }
  set value(time: MyDate | null) {
    const { date } = time || new MyDate(new Date());
    this.parts.setValue({ date });
    this.stateChanges.next();
  }

  propagateChange: any = () => { };
  validateFn: any = () => { };
  constructor(private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.parts = new FormGroup({
      date: new FormControl(null, [Validators.required]),
    });
    this.parts.controls.date.disable();
    fm.monitor(elRef, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this.parts.valueChanges.subscribe(value => {
      // console.log('parts.valueChanges', value, this.propagateChange)
      if (this.propagateChange) {
        this.propagateChange(this.parseDateValue(value));
      }
    });
    this.shouldLabelFloat = false;
    this.id = `app-date-select-${DateSelectComponent.nextId++}`;
    this.describedBy = '';
  }

  ngAfterViewInit() {
    const date = new Date();
    this.parts.setValue({ date });
  }
  parseDateValue(partsValue) {
    partsValue.date = this.parts.controls.date.value;
    const tempDate: Date = partsValue.date ? new Date(partsValue.date) : new Date();
    tempDate.setHours(0, 0, 0, 0);
    return tempDate;
  }

  handleClick(event) {
    // console.log('selectClick', event);
    event.preventDefault();
    event.stopPropagation();
  }

  ///// Custom formControl
  ngOnChanges(inputs) {
    // console.log('ngOnChanges', inputs);
    if (inputs instanceof Date) {
      this.validateFn = createDateValidator();
      // this.propagateChange(this.regionsList);
    }
  }

  writeValue(value: Date) {
    console.log('writeValue', value);
    value = new Date(value);
    if (value) {
      this.parts.setValue({
        date: value,
      });
    }
  }


  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }
  ////////

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    // if ((event.target as Element).tagName.toLowerCase() != 'mat-select') {
    //   this.elRef.nativeElement.querySelector('mat-select')!.focus();
    // }
  }

}
