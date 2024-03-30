import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  processUserInput(username: string, email: string, password: string) : void
  {
    console.log('Username:', username);
  }

}
