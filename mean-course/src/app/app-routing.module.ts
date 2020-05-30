import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

const route: Routes = [
{path: '', component: PostListComponent},

{path: 'create', component: PostCreateComponent},
{path: 'edit/:id', component: PostCreateComponent},


];


@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
