import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../post.modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mime-type.validators';


@Component({
     selector: 'app-post-create',
     templateUrl: './post-create.component.html',
     styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
     isLoading = false;
     postId: any;
     post: Post;
     form: FormGroup;
     imagePreview: any;
     constructor(public postService: PostsService, private router: ActivatedRoute) {
          const params = this.router.params as any;
          this.postId = params._value.id;
     }
     @Output() postOutput = new EventEmitter<Post>();

     ngOnInit() {
          this.form = new FormGroup({
               title: new FormControl(null, Validators.required),
               content: new FormControl(null, Validators.required),
               image: new FormControl(null, {validators: [Validators.required],
               asyncValidators: [mimeType]
          }),
          });
          this.isLoading = true;
          if (this.postId) {
               this.postService.getPostById(this.postId).subscribe((res:any) => {
                    this.post = { id: res._id, title: res.title, content: res.content,imagePath: res.imagePath
                    };
                    this.form.setValue({
                         title: this.post.title,
                         content: this.post.content,
                         image: this.post.imagePath
                    });
                    this.isLoading = false;
               });
          } else {
               this.isLoading = false;
          }
     }
     onFileChange(event: Event) {
          const file = (event.target as HTMLInputElement).files[0];
          this.form.patchValue({ image: file });
          this.form.get('image').updateValueAndValidity();
          const reader = new FileReader();

          reader.onload = () => {
               this.imagePreview = reader.result;
          }
          reader.readAsDataURL(file);
     }

     onAddPost() {
          console.log(this.form.value, 'form data');
          if (this.form.invalid) {
               return;
          }
          if (this.postId) {
               this.postService.updatePost(this.postId, this.form.value);
          } else {
               this.postService.addPosts(this.form.value.title, this.form.value.content,this.form.value.image);
          }
     }



}
