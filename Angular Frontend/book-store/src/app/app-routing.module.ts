import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { BookDetailsComponent } from './core/book-details/book-details.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { SuccessfulRegistrationComponent } from './core/successful-registration/successful-registration.component';
import { AuthGuard } from './shared/auth-guard';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { FavoritesComponent } from './user/favorites/favorites.component';
import { CartComponent } from './user/cart/cart.component';
import { DeleteProfileComponent } from './user/delete-profile/delete-profile.component';
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AboutComponent } from './core/about/about.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { LoginRegisterGuard } from './shared/login-register-guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginRegisterGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginRegisterGuard] },
  { path: 'successful-registration', component: SuccessfulRegistrationComponent, canActivate: [LoginRegisterGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'delete-profile', component: DeleteProfileComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' } // Redirect invalid URLs to NotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
