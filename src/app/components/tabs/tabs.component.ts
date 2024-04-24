import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input() data: any;
  activeTabIndex:number = 0;

}
