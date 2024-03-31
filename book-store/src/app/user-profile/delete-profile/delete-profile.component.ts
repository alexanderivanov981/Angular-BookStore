import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/home/authentication.service';
import { UserService } from 'src/app/home/user.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent {
  password: string = '';

  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  confirmDeletion(password: string): void {
    this.userService.getUser(this.authService.currentUsername).subscribe((user) => {
      if (user.password == password) {
        this.userService.deleteUser(this.authService.currentUserId).subscribe(() => {
          console.log('User successfully deleted.');
          this.authService.logout();
          this.router.navigate(['/']);
        });
      }
    });
  }

}
