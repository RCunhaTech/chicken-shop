import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-total-status',
  templateUrl: './total-status.component.html',
  styleUrls: ['./total-status.component.scss'],
})

export class TotalStatusComponent implements OnInit {

  @Input() title?:string

  @Input() total?:number

  constructor(private stateService:StateService) { }

  ngOnInit() {}

}
