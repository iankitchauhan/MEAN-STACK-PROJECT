import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../posts/post.modal';
import { PostsService } from '../posts/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts = [];
  private postsSub: Subscription;
  isLoading =false;
  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub =   this.postService.getPostListener().subscribe((post: Post[]) => {
   console.log(post, 'post dta');
   this.isLoading = false;
   this.posts = post;
    });
  }

  deletePost(postId: any) {
    this.postService.deletePostData(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
