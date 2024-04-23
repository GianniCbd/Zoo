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
    path: 'chess',
    component: ChessComponent,
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
