import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TokenInterceptor } from './auth/auth/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { HabitatComponent } from './components/habitat/habitat.component';
import { ZooComponent } from './components/zoo/zoo.component';
import { HomeComponent } from './components/home/home.component';

import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { ChessComponent } from './components/chess/chess.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { MissionComponent } from './components/mission/mission.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AnimalsComponent,
    HabitatComponent,
    ZooComponent,
    HomeComponent,
    IntroPageComponent,
    ChessComponent,
    QuizComponent,
    AnimalDetailsComponent,
    MissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DragDropModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
