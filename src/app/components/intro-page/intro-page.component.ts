import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth/auth-data';
import { AuthService } from 'src/app/auth/auth/auth.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent implements OnInit {
  utente!: AuthData | null;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
  }
}
