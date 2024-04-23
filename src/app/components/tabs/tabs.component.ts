import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input() data: any;
  @Output() setIndex = new EventEmitter();


  activeTabIndex:number = 0;
  activeDataIndex:number= 0;

  changeIndex(tabIndex:number,dataIndex:number){
    console.log(tabIndex,dataIndex);
    this.setIndex.emit({tabIndex,dataIndex});
  }



}
