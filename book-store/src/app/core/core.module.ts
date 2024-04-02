import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoPermissionsComponent } from './no-permissions/no-permissions.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    BookDetailsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NoPermissionsComponent,
    RegisterComponent,
    SuccessfulRegistrationComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UserModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
