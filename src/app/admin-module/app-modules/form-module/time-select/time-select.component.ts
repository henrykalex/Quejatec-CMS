import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component, OnInit, AfterViewInit, OnChanges, OnDestroy, Input, ElementRef, HostListener, forwardRef, SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

export class MyTime {
  constructor(public minutes: string, public hours: string) { }
}

export function createTimeValidator() {
  return (c: FormControl) => {
    // console.log('c', c)
    const err = {
      requiredError: {
        given: c.value,
      }
    };
    return (c.value === undefined || c.value == null) ? err : null;
  };
}

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: TimeSelectComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimeSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TimeSelectComponent), multi: true },
  ]
})
export class TimeSelectComponent implements OnInit, AfterViewInit, OnChanges, MatFormFieldControl<Date>, OnDestroy, ControlValueAccessor {
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
  controlType = 'app-time-select';

  get empty() {
    const { value: { hours, minutes } } = this.parts;

    return !hours && !minutes;
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
    this.disabledPriv ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  private valuePrivate: Date | null;
  @Input()
  get value(): Date | null {
    return this.valuePrivate;
  }
  set value(value: Date | null) {
    // console.log('set value', value);
    this.valuePrivate = value;
    this.parts.setValue({ minutes: value.getMinutes(), hours: value.getHours() });
    this.stateChanges.next();
  }

  propagateChange: (_: any) => void = (_: any) => { };
  propagateTouched: () => void = () => { };
  validateFn: any = () => { };

  constructor(private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    console.log('app time select constructor');
    this.parts = new FormGroup({
      hours: new FormControl(0, [Validators.required]),
      minutes: new FormControl(0, [Validators.required]),
    });
    fm.monitor(elRef, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this.minutesOptions = [];
    for (let i = 0; i <= 59; i++) {
      this.minutesOptions.push({ label: i < 10 ? `0${i}` : i, value: i });
    }
    this.hoursOptions = [];
    for (let i = 0; i <= 23; i++) {
      this.hoursOptions.push({ label: i < 10 ? `0${i}` : i, value: i });
    }
    this.parts.valueChanges.subscribe(value => {
      console.log('parts.valueChanges', value);
      this.propagateTouched();
      if (this.propagateChange) {
        console.log('parts valueChanges', value, this.value);
        if (!this.value || (this.value.getHours() !== value.hours || this.value.getMinutes() !== value.minutes)) {
          this.propagateChange(this.parseDateValue(value));
        }
      }
    });

    this.shouldLabelFloat = true;
    this.id = `app-time-select-${TimeSelectComponent.nextId++}`;
    this.describedBy = '';
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const date = new Date();
    if (isNaN(this.parts.value.hours) || isNaN(this.parts.value.minutes)) {
      this.parts.setValue({ hours: date.getHours(), minutes: date.getMinutes() });
    }
  }

  parseDateValue(partsValue) {
    const tempDate: Date = new Date();
    if (partsValue.hours != null && partsValue.hours !== undefined) {
      tempDate.setHours(partsValue.hours);
    }
    if (partsValue.minutes != null && partsValue.minutes !== undefined) {
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
  ngOnChanges(changes: SimpleChanges) {
    // console.log('ngOnChanges', changes);
    if (changes) {
      this.validateFn = createTimeValidator();
      // this.propagateChange(this.regionsList);
    }
  }

  writeValue(value: Date) {
    // console.log('writeValue', value, typeof value );
    if (value) {
      value = new Date(value);
      this.parts.setValue({
        hours: value.getHours(),
        minutes: value.getMinutes(),
      });
    }
  }

  registerOnChange(fn) {
    console.log('propagateChange', fn);
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

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
  }

}
