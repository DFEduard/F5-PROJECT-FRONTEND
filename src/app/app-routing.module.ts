import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { LoginComponent } from './login/login.component'
import { UsersComponent } from './users/users.component'

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'users', component: UsersComponent},


    // otherwise redirect to login
    {path: '**', redirectTo: ''}

]

export const AppRoutingModule = RouterModule.forRoot(routes)
