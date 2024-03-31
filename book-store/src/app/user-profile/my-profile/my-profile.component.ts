import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class UserDetailsComponent {
  favoritesIconUrl : string = "https://static.vecteezy.com/system/resources/previews/010/158/312/original/heart-icon-sign-symbol-design-free-png.png";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";
  logoutIconUrl: string = "https://static-00.iconduck.com/assets.00/log-out-icon-1024x1024-90bzm0pv.png";

}
