import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aapasmein-wall',
  templateUrl: './aapasmein-wall.page.html',
  styleUrls: ['./aapasmein-wall.page.scss'],
})
export class AapasmeinWallPage implements OnInit {

  posts = [
    {
      user: {
        name: 'John Doe',
        image: '../../../assets/avtar4.png',
      },
      timestamp: '2 hrs ago',
      content: 'Just enjoying a sunny day at the beach!',
      image: '../../../assets/laptop.jpg',
      likes: 12,
      comments: [
        { user: 'Jane Smith', text: 'Looks amazing!' },
        { user: 'Mike Johnson', text: 'Wish I was there!' },
      ],
      showComments: false,
      newComment: '',
    },
    {
      user: {
        name: 'Jane Smith',
        image: '../../../assets/avtar4.png',
      },
      timestamp: '1 day ago',
      content: 'Had an amazing dinner with friends.',
      image: '',
      likes: 34,
      comments: [],
      showComments: false,
      newComment: '',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  likePost(post: any) {
    post.likes++;
  }

  toggleCommentSection(post: any) {
    post.showComments = !post.showComments;
  }

  addComment(post: any) {
    if (post.newComment.trim()) {
      post.comments.push({ user: 'You', text: post.newComment.trim() });
      post.newComment = ''; // Clear the input field
    }
  }

  sharePost(post: any) {
    console.log(`Sharing post: ${post.content}`);
    // Add your share logic here
  }

}
