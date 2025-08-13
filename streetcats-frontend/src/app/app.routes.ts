import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MapComponent } from './map/map.component';
import { CatComponent } from './cat/cat.component';
import { authGuard } from './_guards/auth.guard';
import { NewCatComponent } from './new-cat/new-cat.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
    }
    ,
    {
        path:'home',
        component: HomeComponent,
        title: "Home - StreetCats",
        data: { animation: 'HomeComponent' }
    },
    {
        path:'signup',
        component: SignupComponent,
        title: "Sign Up - StreetCats",
        data: { animation: 'SignupComponent' }
    },
    {
        path:'login',
        component: LoginComponent,
        title: "Log In - StreetCats",
        data: { animation: 'LoginComponent' }
    },
    {
        path: "logout",
        component: LogoutComponent,
        title: "Log Out - StreetCats",
        canActivate: [authGuard],
        data: { animation: 'LogoutComponent' }
    },
    {
        path:'map',
        component: MapComponent,
        title: "Mappa - StreetCats",
        data: { animation: 'MapComponent' }
    },
    {
        path:'new-cat',
        component: NewCatComponent,
        title: "Nuovo gatto - StreetCats",
        canActivate: [authGuard],
        data: { animation: 'NewCatComponent' }
    },
    {
        path:'cats/:id',
        component: CatComponent,
        title: "Gatto - StreetCats",
        data: { animation: 'CatComponent' }
    }
];
