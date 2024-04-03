import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LogoutComponent } from './logout/logout.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileMenuComponent } from './user-profile/user-profile-menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent,
    DeleteProfileComponent,
    FavoritesComponent,
    LogoutComponent,
    MyProfileComponent,
    UserProfileMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    UserProfileMenuComponent
  ]
})
export class UserModule { }
