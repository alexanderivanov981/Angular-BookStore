import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoriesDropdownComponent } from './categories-dropdown/categories-dropdown.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './register/email-validator.directive';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-profile/my-profile/my-profile.component';
import { FavoritesComponent } from './user-profile/favorites/favorites.component';
import { CartComponent } from './user-profile/cart/cart.component';
import { DeleteProfileComponent } from './user-profile/delete-profile/delete-profile.component';
import { LogoutComponent } from './user-profile/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    CategoriesDropdownComponent,
    RegisterComponent,
    BookDetailsComponent,
    EmailValidatorDirective,
    SuccessfulRegistrationComponent,
    UserProfileComponent,
    UserDetailsComponent,
    FavoritesComponent,
    CartComponent,
    DeleteProfileComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
