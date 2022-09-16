import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-creation',
  templateUrl: './poll-creation.component.html',
})
export class PollCreationComponent implements OnInit {
  @Output() updatePollDetails = new EventEmitter<any>();
  @Output() deletePollOption = new EventEmitter<number>();
  @Output() resetPoll = new EventEmitter<null>();

  public form: FormGroup;
  public submitted: boolean = false;
  public disabled = false;
  public subscription:Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pollService:PollService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      pollQuestion: new FormControl(null, RxwebValidators.maxLength({value: 80, message:'Max Length reached.'})),
      addOptionControl: new FormControl(null, [RxwebValidators.required(), RxwebValidators.maxLength({value: 80, message:'Max Length reached.'})]),
      pollOptions: new FormArray([], RxwebValidators.maxLength({value: 9}))
    });

    this.subscription.push(this.form.valueChanges.subscribe(res => {
      this.pollService.setPollDetails(res);

      if(this.pollOptionsFormArray.length < 10){
        this.form.get('addOptionControl')?.enable({ emitEvent: false });
      } else {
        this.form.get('addOptionControl')?.disable({ emitEvent: false });
      }

      this.updatePollDetails.emit(res);
    }));
  }

  get pollOptionsFormArray(): FormArray {
    return this.form.get('pollOptions') as FormArray;
  }

  public addOption():void {

    const optionForm = this.formBuilder.group({
      pollOption: new FormControl(this.form.get('addOptionControl')?.value, RxwebValidators.maxLength({value: 80, message:'Max Length reached.'}))
    });

    this.pollOptionsFormArray.push(optionForm);
    this.form.get('addOptionControl')?.reset();
  }

  public deleteOption(optionIndex: number):void {
    // this.pollService.setDeletedOptionIndex(optionIndex);
    this.pollOptionsFormArray.removeAt(optionIndex);
    this.deletePollOption.emit(optionIndex);

  }

  public submit():void{
    // console.log("form value =>", this.form.value);
  }

  public reset():void{
    this.form.reset();
    while (this.pollOptionsFormArray.length !== 0) {
      this.pollOptionsFormArray.removeAt(0)
    }
    this.resetPoll.emit();

    // console.log("form value 2 =>", this.form.value);
  }

  // private checkFormValidity():boolean{
  //   return this.form.valid;
  // }

  // private checkForErrors():void{
  //   if (!this.form.valid){
  //     console.log("aaa");
  //   }
  // }
}
