import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  favoritesIconUrl : string = "assets/images/heart-icon-red.jpg";
  shoppingCartIconUrl: string = "assets/images/cart-add.png";
  logoutIconUrl: string = "assets/images/logout-icon.png";
  deleteProfileIconUrl: string = "assets/images/delete-profile-icon.png";

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
