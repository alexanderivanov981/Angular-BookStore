import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { DBService } from 'src/app/shared/db-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: ''
  };

constructor(private authService: AuthService,
            private router: Router,
            private dbService: DBService) {}

  onSubmit() {
    this.authService.register(this.registerData.username, this.registerData.email, this.registerData.password).subscribe(
      (response) => {
        this.dbService.openSnackBar('User registered successfully.', '');
        this.router.navigate(['/successful-registration']);
      },
      (error) => {
        console.error(error);
        this.dbService.openSnackBar('Failed to register user.', '');
      }
    );
  }
}