import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoiced-card',
  templateUrl: './invoiced-card.component.html',
  styleUrls: ['./invoiced-card.component.scss'],
})
export class InvoicedCardComponent implements OnInit {

  @Input() created?:string
  @Input() quantity?:number
  @Input() price?:number
  @Input() total?:number
  @Input() payment?:string 

  constructor() { }

  ngOnInit() {}

}
