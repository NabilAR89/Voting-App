import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DataSourceContract } from 'src/app/models/data-source.contract';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
})
export class PollVoteComponent implements OnInit {
  public dataSource: DataSourceContract;
  public form: FormGroup;
  public disableVoteBtn:boolean = false;
  @Input() pollDetailsData:any;
  @Output() addVote = new EventEmitter<number>();


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
    this.addVote.emit(value);
  }
}
