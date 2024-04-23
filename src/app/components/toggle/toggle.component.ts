import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
  @Input() label: string = "";
  @Input() state: number = 1;
  @Output() toggle = new EventEmitter();



  toggleData() {
    this.toggle.emit();
  }
}
