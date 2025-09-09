import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "report", component: ReportComponent},
    {path: "register", component: RegisterComponent},
    {path: "**", redirectTo: "/lo/home"}
];
