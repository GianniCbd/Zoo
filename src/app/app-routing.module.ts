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
    path: 'home',
    component: HomeComponent,
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
  { path: 'habitats/add', component: HabitatComponent },
  { path: 'habitats/edit/:id', component: HabitatComponent },
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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
