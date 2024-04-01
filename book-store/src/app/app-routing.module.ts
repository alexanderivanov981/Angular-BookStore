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
import { AuthGuard } from './home/auth-guard';
import { NoPermissionsComponent } from './no-permissions/no-permissions.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'successful-registration', component: SuccessfulRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'delete-profile', component: DeleteProfileComponent, canActivate: [AuthGuard] },
  { path: 'no-permissions', component: NoPermissionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
