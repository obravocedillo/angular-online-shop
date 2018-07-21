import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarritoComponent } from './carrito/carrito.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: "login",
        pathMatch: 'full'
    },
    { path: 'login', component: LoginFormComponent},
    { path: 'main', component: MainPageComponent },
    { path: 'basket', component: CarritoComponent },
    { path: '**', component: PageNotFoundComponent }


];

@NgModule({

  declarations: [
    AppComponent,
    LoginFormComponent,
    MainPageComponent,
    PageNotFoundComponent,
    CarritoComponent,

  ],
  imports: [
      RouterModule.forRoot(
      appRoutes,

  ),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
