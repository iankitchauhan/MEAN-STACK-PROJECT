import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const route: Routes = [
{path: '', component: PostListComponent},
{path: 'auth/login', component: LoginComponent},
{path: 'auth/signup', component: SignupComponent},
{path: 'create', component: PostCreateComponent},
{path: 'edit/:id', component: PostCreateComponent},


];


@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
