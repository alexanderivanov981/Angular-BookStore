import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import { UserDetailsComponent } from './user-profile/my-profile/my-profile.component';
import { FavoritesComponent } from './user-profile/favorites/favorites.component';
import { CartComponent } from './user-profile/cart/cart.component';
import { DeleteProfileComponent } from './user-profile/delete-profile/delete-profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'successful-registration', component: SuccessfulRegistrationComponent },
  { path: 'my-profile', component: UserDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'delete-profile', component: DeleteProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
