import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ToggleComponent } from '../components/toggle/toggle.component';

@Component({
  selector: 'app-details',
  standalone: true,
  // add components here to use in the html template
  imports: [HeaderComponent,MatIconModule,ToggleComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

}
