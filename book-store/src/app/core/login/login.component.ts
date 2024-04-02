import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { DBService } from 'src/app/shared/db-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  
  constructor(private authService: AuthService,
              private router: Router,
              private dbService: DBService) { }

  onSubmit() {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      () => {
        this.dbService.openSnackBar('Login successful.', '');
        this.router.navigate(["/"]);
      },
      (error) => {
        console.error(error);
        this.dbService.openSnackBar('Login failed.', '');
      }
    );
  }

}
