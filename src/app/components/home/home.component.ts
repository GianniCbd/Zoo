import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isSpring!: boolean;
  isSummer!: boolean;
  isAutumn!: boolean;
  isWinter!: boolean;
  currentUser!: User;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private authSrv: AuthService) {}

  getme() {
    this.authSrv.getMe().subscribe((it) => {
      this.currentUser = it;
    });
  }

  ngOnInit(): void {
    const currentMonth = new Date().getMonth() + 1;
    this.isSpring = currentMonth >= 3 && currentMonth <= 5;
    this.isSummer = currentMonth >= 6 && currentMonth <= 8;
    this.isAutumn = currentMonth >= 9 && currentMonth <= 11;
    this.isWinter = currentMonth === 12 || currentMonth <= 2;

    this.getme();
  }
}
