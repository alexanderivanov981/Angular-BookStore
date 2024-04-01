import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../home/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

constructor(private authService: AuthService, private router: Router) {}

registerUser(registerForm: NgForm, username: string, email: string, password: string): void {
    if (registerForm.valid) {
      this.authService.register(username, email, password).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/successful-registration']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}