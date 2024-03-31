import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../home/user';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (private http: HttpClient, private router: Router) {}

  registerUser(registerForm: NgForm) {
    if (registerForm.valid) {
      const { username, email, password } = registerForm.value;
      const user = { username, email, password };
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      this.http.post<User>(`${environment.usersAPI}`, user, httpOptions)
        .subscribe(
          () => {
            this.router.navigate(['/successful-registration']);
          },
          (error) => {
            console.error('Error saving to DB:', error);
          }
        );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}