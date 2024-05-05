import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: User | undefined;
  private unsubscribe$: Subject<void> = new Subject<void>();
  showEditForm: boolean = false;

  constructor(private UserSrv: UserService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.UserSrv.getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (user: User) => {
          this.currentUser = user;
          console.log(this.currentUser);
        },
        (error) => {
          console.log('Errore', error);
        }
      );
  }

  updateUserDetails(): void {
    if (this.currentUser) {
      const userToUpdate: Partial<User> = {
        name: this.currentUser.name,
        surname: this.currentUser.surname,
        email: this.currentUser.email,
      };

      this.UserSrv.updateCurrentUser(this.currentUser.id, userToUpdate)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (updatedUser: User) => {
            this.currentUser = updatedUser;
            console.log('Dettagli utente aggiornati:', updatedUser);
          },
          (error) => {
            console.error(
              "Errore durante l'aggiornamento dei dettagli:",
              error
            );
          }
        );
    }
  }
  editUser() {
    this.showEditForm = true;
  }

  cancelEdit() {
    this.showEditForm = false;
  }

  getUserById(id: string): void {
    this.UserSrv.findById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (user) => (this.currentUser = user),
        (error) => {
          console.log('Errore', error);
        }
      );
  }
}
