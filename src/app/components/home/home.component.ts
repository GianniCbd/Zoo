import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { User } from 'src/app/models/user';

declare var bootstrap: any;
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

  ngOnInit(): void {}
}
