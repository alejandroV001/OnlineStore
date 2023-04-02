import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IWhishlistItem } from '../../models/whishlist';

@Component({
  selector: 'app-whishlist-summary',
  templateUrl: './whishlist-summary.component.html',
  styleUrls: ['./whishlist-summary.component.scss']
})
export class WhishlistSummaryComponent implements OnInit {

  @Output() remove: EventEmitter<IWhishlistItem> = new EventEmitter<IWhishlistItem>();
  @Input() items!: any[] ;
  
  constructor() { }

  ngOnInit(): void {
  }

  removeWhishlistItem(item: IWhishlistItem){
    this.remove.emit(item);
  }

}
