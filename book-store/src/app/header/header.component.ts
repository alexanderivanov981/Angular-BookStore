import { Component } from '@angular/core';
import { AuthenticationService } from '../home/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor (public authentication: AuthenticationService) {}
}
