import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { Animal } from 'src/app/models/animal';
import { Favorite } from 'src/app/models/favorite';
import { User } from 'src/app/models/user';
import { AnimalService } from 'src/app/service/animal.service';
import { FavoriteService } from 'src/app/service/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favorites: Favorite[] = [];
  animal: Animal[] = [];

  userId!: string;
  currentUser!: User;

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.getMe().subscribe((user: User) => {
      this.userId = user.id;
      this.getMyFavorites();
    });
  }

  viewAnimalDetails(animal: number) {
    this.router.navigate(['/animal', animal]);
  }

  getMyFavorites(): void {
    this.favoriteService
      .getMyFavorite(this.userId)
      .subscribe((favorites: Favorite[]) => {
        this.favorites = favorites;
      });
  }
}
