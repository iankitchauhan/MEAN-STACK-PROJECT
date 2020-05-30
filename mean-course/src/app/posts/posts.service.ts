import { Injectable } from '@angular/core';
import { Post } from './post.modal';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,private router: Router ) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  getPosts() {
    this.http.get<{ message: string, post: any }>('http://localhost:3000/api/posts').pipe(map((postDate) => {
      return postDate.post.map(modifiedData => {
        return {
          title: modifiedData.title,
          content: modifiedData.content,
          id: modifiedData._id
        };
      });
    })).subscribe((res: any) => {
      this.posts = res;
      this.postsUpdated.next([...this.posts]);
    });
  }
  getPostListener() {
    return this.postsUpdated.asObservable();
  }

  deletePostData(postId) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe((res) => {
      const updatedPost = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
    });
  }

  updatePost(postId, postUpdate) {
    console.log(postUpdate, 'post update');
    const posts = {
      id: postId,
      title: postUpdate.enterTitleValue,
      content: postUpdate.enterContentValue
    };
    this.http.put('http://localhost:3000/api/posts/' + postId, posts).subscribe((res) => {
      const updatedPost = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });

  }
  getPostById(postId) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + postId);
  }

  addPosts(title: string, content: string,image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post('http://localhost:3000/api/posts', postData).subscribe((res) => {

      console.log(res, 'fetched response data');
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
  
    });
  
  }

}
