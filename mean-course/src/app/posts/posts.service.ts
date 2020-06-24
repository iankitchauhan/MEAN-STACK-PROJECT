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

  constructor(private http: HttpClient, private router: Router) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();
  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, post: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams).pipe(map((postDate) => {
      return {
        posts: postDate.post.map(modifiedData => {
          return {
            title: modifiedData.title,
            content: modifiedData.content,
            id: modifiedData._id,
            imagePath: modifiedData.imagePath
          };
        }),
        maxPosts: postDate.maxPosts
      }
    })
    ).subscribe((res: any) => {
      this.posts = res.posts;
      this.postsUpdated.next({ posts: [...this.posts], postCount: res.maxPosts });
    });
  }
  getPostListener() {
    return this.postsUpdated.asObservable();
  }

  deletePostData(postId) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }

  updatePost(postId, postUpdate) {
    console.log(postUpdate, 'post update');
    let postData;
    if (typeof (postUpdate.image) === 'object') {
      console.log(postUpdate, 'object update');

      postData = new FormData();
      postData.append('id', postId);
      postData.append('title', postUpdate.title);
      postData.append('content', postUpdate.content);
      postData.append('image', postUpdate.image, postUpdate.title);

    } else {
      postData = {
        id: postId,
        title: postUpdate.title,
        content: postUpdate.content,
        image: postUpdate.image
      };
    }

    this.http.put('http://localhost:3000/api/posts/' + postId, postData).subscribe((res) => {

      this.router.navigate(["/"]);
    });

  }
  getPostById(postId) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + postId);
  }

  addPosts(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post('http://localhost:3000/api/posts', postData).subscribe((res) => {

      this.router.navigate(["/"]);

    });

  }

}
