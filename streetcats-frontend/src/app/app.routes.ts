import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MapComponent } from './map/map.component';
import { CatComponent } from './cat/cat.component';

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
        path:'login',
        component: LoginComponent,
        title: "Log In - StreetCats"
    },
    {
        path:'signup',
        component: SignupComponent,
        title: "Sign Up - StreetCats"
    },
    {
        path:'map',
        component: MapComponent,
        title: "Mappa - StreetCats"
    },
    {
        path:'cat',
        component: CatComponent,
        title: "Nuovo gatto - StreetCats"
    }
];
