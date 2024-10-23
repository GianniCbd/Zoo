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
import { CardComponent } from './components/card/card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { FooterComponent } from './components/footer/footer.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CartComponent } from './components/cart/cart.component';
import { MapComponent } from './components/map/map.component';
import { ContactComponent } from './components/contact/contact.component';
import { CampoFioritoComponent } from './components/campo-fiorito/campo-fiorito.component';

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
    CardComponent,
    ProfileComponent,
    FavoriteComponent,
    FooterComponent,
    TicketComponent,
    CartComponent,
    MapComponent,
    ContactComponent,
    CampoFioritoComponent,
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
