import { Component } from '@angular/core';
import { Post } from './posts/post.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
storePost: Post[] = [];
  // tslint:disable-next-line: no-shadowed-variable
  getPost(post: Post) {
    this.storePost.push(post);
  }
}
