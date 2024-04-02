import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
import { DBService } from './db-service.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DBService
  ]
})
export class SharedModule { }
