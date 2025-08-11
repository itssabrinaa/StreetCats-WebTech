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
        title: "Home - StreetCats"
    },
    {
        path:'signup',
        component: SignupComponent,
        title: "Sign Up - StreetCats"
    },
    {
        path:'login',
        component: LoginComponent,
        title: "Log In - StreetCats"
    },
    {
        path: "logout",
        component: LogoutComponent,
        title: "Log Out - StreetCats",
        canActivate: [authGuard]
    },
    {
        path:'map',
        component: MapComponent,
        title: "Mappa - StreetCats"
    },
    {
        path:'new-cat',
        component: NewCatComponent,
        title: "Nuovo gatto - StreetCats",
        canActivate: [authGuard]
    },
    {
        path:'cats/:id',
        component: CatComponent,
        title: "Gatto - StreetCats"
    }
];
