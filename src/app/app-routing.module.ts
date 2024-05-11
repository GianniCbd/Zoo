import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ZooComponent } from './components/zoo/zoo.component';
import { HabitatComponent } from './components/habitat/habitat.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ChessComponent } from './components/chess/chess.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { MissionComponent } from './components/mission/mission.component';
import { CardComponent } from './components/card/card.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Route[] = [
  {
    path: 'intro',
    component: IntroPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'zoo',
    component: ZooComponent,
  },
  {
    path: 'mission',
    component: MissionComponent,
  },
  {
    path: 'habitat',
    component: HabitatComponent,
  },

  {
    path: 'animal',
    component: AnimalsComponent,
  },
  {
    path: 'animal/:id',
    component: AnimalDetailsComponent,
  },
  {
    path: 'chess',
    component: ChessComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'card',
    component: CardComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'ticket',
    component: TicketComponent,
  },
  {
    path: 'carrello',
    component: CartComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
