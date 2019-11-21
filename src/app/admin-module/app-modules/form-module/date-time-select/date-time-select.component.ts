import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, OnInit, AfterViewInit, OnChanges, OnDestroy, Input, ElementRef, HostListener, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

export class MyDateTime {
  constructor(public minutes: string, public hours: string, public date: Date) { }
}

export function createDateTimeValidator() {
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
  selector: 'app-date-time-select',
  templateUrl: './date-time-select.component.html',
  styleUrls: ['./date-time-select.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: DateTimeSelectComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateTimeSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateTimeSelectComponent), multi: true },
  ]
})
export class DateTimeSelectComponent implements AfterViewInit, OnChanges, MatFormFieldControl<MyDateTime>, OnDestroy, ControlValueAccessor {
  static nextId = 0;
  @HostListener('[class.example-floating]') shouldLabelFloat;
  @HostListener('[id]') id;
  @HostListener('[attr.aria-describedby]') describedBy;

  minutesOptions: any[];
  hoursOptions: any[];

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  ngControl = null;
  errorState = false;
  controlType = 'app-date-time-select';


  get empty() {
    const { value: { hours, minutes, date } } = this.parts;
    return !hours && !minutes && !date;
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
  get value(): MyDateTime | null {
    const { value: { minutes, hours, date } } = this.parts;
    if (minutes.length === 2 && hours.length === 2) {
      return new MyDateTime(minutes, hours, date);
    }
    return null;
  }
  set value(time: MyDateTime | null) {
    const { minutes, hours, date } = time || new MyDateTime('', '', new Date());
    this.parts.setValue({ minutes, hours, date });
    this.stateChanges.next();
  }

  propagateChange: any = () => { };
  validateFn: any = () => { };
  constructor(private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.parts = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      hours: new FormControl('', [Validators.required]),
      minutes: new FormControl('', [Validators.required]),
    });
    this.parts.controls.date.disable();
    fm.monitor(elRef, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this.minutesOptions = [];
    for (let i = 1; i < 60; i++) {
      this.minutesOptions.push({ label: i < 10 ? `0${i}` : i, value: i });
    }
    this.hoursOptions = [];
    for (let i = 0; i < 24; i++) {
      this.hoursOptions.push({ label: i < 10 ? `0${i}` : i, value: i });
    }
    this.parts.valueChanges.subscribe(value => {
      // console.log('parts.valueChanges', value, this.propagateChange)
      if (this.propagateChange) {
        this.propagateChange(this.parseDateValue(value));
      }
    });
    this.shouldLabelFloat = false;
    this.id = `app-time-select-${DateTimeSelectComponent.nextId++}`;
    this.describedBy = '';
  }

  ngAfterViewInit() {
    const date = new Date();
    this.parts.setValue({ date, hours: date.getHours(), minutes: date.getMinutes() });
  }
  parseDateValue(partsValue) {
    partsValue.date = this.parts.controls.date.value;
    const tempDate: Date = partsValue.date ? new Date(partsValue.date) : new Date();
    tempDate.setHours(0, 0, 0, 0);
    if (partsValue.hours) {
      tempDate.setHours(partsValue.hours);
    }
    if (partsValue.minutes) {
      tempDate.setMinutes(partsValue.minutes, 0, 0);
    }
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
      this.validateFn = createDateTimeValidator();
      // this.propagateChange(this.regionsList);
    }
  }

  writeValue(value: Date) {
    console.log('writeValue', value);
    value = new Date(value);
    if (value) {
      this.parts.setValue({
        date: value,
        hours: value.getHours(),
        minutes: value.getMinutes(),
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
