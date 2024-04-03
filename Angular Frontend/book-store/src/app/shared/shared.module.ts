import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
import { DBService } from './db-service.service';
import { RouterModule } from '@angular/router';
import { LoginRegisterGuard } from './login-register-guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DBService,
    LoginRegisterGuard
  ]
})
export class SharedModule { }
