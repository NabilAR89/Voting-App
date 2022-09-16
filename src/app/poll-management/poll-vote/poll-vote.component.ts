import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
})
export class PollVoteComponent implements OnInit {
  public dataSource: any;
  public form: FormGroup;
  public disableVoteBtn:boolean = false;
  @Input() pollDetailsData:any;
  @Output() addVote = new EventEmitter<any>();


  constructor(
    private formBuilder:FormBuilder,
    private pollService:PollService
  ) {}

  ngOnInit(): void {

    this.pollService.getDataSource().subscribe(res => {
      this.dataSource = res;
      this.initForm();
    })
  }

  private initForm() {
    this.form = this.formBuilder.group({
      answer: new FormControl(null, RxwebValidators.required()),
    });
  }

  public vote():void{
    let value = this.form.get('answer')?.value;
    //console.log("value ==>", value);
    // this.pollService.setPollAnswer(value);
    this.addVote.emit(value);
  }

  // public setPollOption(option:string):string{
  //   console.log("option =>", option);
  //   if(option === '' && this.pollDetails.pollOptions.length == 2){
  //     this.form.get('answer')?.disable();
  //     this.disableVoteBtn = true;
  //     console.log("this.disableVoteBtn =>", this.disableVoteBtn);
  //     return '';
  //   }
  //   this.disableVoteBtn = false;
  //   this.form.get('answer')?.enable();
  //   return option
  // }
}
