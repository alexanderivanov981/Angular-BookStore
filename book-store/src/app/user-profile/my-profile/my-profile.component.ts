import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/home/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class UserDetailsComponent {
  favoritesIconUrl : string = "assets/images/heart-icon-black.jpg";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";
  logoutIconUrl: string = "https://static-00.iconduck.com/assets.00/log-out-icon-1024x1024-90bzm0pv.png";
  deleteProfileIconUrl: string = "https://cdn-icons-png.freepik.com/512/24/24801.png";

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to home.
  }
}
