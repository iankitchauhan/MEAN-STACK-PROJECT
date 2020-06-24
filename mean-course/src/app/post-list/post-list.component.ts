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
  totalPosts =0;
  postsPerPage= 2;
  currentPage =1;
  pageSizeOptions = [1, 2, 5, 10]
  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub =   this.postService.getPostListener().subscribe((postData:{posts:Post[],postCount:number}) => {
   this.isLoading = false;
   this.totalPosts = postData.postCount;
   this.posts = postData.posts;
    });
  }

  deletePost(postId: any) {
    this.postService.deletePostData(postId).subscribe(res=>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);  
    });
  }


  onChangePage(pageDta){
    this.isLoading = true;

this.postService.getPosts(pageDta.pageSize,pageDta.pageIndex+1);

  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
