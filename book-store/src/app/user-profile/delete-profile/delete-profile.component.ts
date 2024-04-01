import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/home/auth.service';
import { User } from 'src/app/home/user';
import { UserService } from 'src/app/home/user.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent {
  password: string = '';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  deleteUser(password: string): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.userService.deleteUser(user.id, password).subscribe(
        () => {
          console.log(`User with ID ${11} deleted successfully.`);
          this.authService.logout();
          this.router.navigate(['/']); // Navigate home.
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

}
