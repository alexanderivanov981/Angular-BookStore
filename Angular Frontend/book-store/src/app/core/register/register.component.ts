import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { DBService } from 'src/app/shared/db.service';

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
      () => {
        this.dbService.openSnackBar('User registered successfully.', '');
        this.router.navigate(['/successful-registration']);
      },
      (error) => {
        if (error.status === 409) {
          this.dbService.openSnackBar('Username is taken!', '');
        } else {
          this.dbService.openSnackBar('Register failed.', '');
        }
        console.error(error);
      }
    );
  }
}