import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-error-input',
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss'],
})
export class ErrorInputComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() controlName: string = '';
  @Input() submitted: boolean = false;

  errors: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  ObjectKey = Object.keys;
  subscriptionList: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.form.get(this.controlName)) {
      this.setErrors();
      this.checkControlChanges();
    }
  }
  private checkControlChanges(): void {
    this.subscriptionList.push(
      this.form.get(this.controlName)!.valueChanges.subscribe((res) => {
        this.setErrors();
      })
    );
  }

  private setErrors(): void {
    this.errors.next(this.form.get(this.controlName)!.errors);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((element) => element.unsubscribe());
  }
}
