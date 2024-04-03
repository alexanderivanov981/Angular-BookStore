import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent {
  password: string = '';

  constructor(private dbService: DBService, private authService: AuthService, private router: Router) { }

  deleteUser(password: string): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.dbService.deleteUser(user.id, password).subscribe(
        () => {
          this.dbService.openSnackBar('User successfully deleted.', '');
          this.authService.logout();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(error);
          this.dbService.openSnackBar('Failed deleting user.', '');
        }
      );
    }
  }

}
