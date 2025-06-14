'use client';
import { formatDate } from '@/lib/format';
import { LikeButton } from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react';

const Post = ({ post, action }) => <article className="post">
  <div className="post-image">
    <img src={post.image} alt={post.title} />
  </div>
  <div className="post-content">
    <header>
      <div>
        <h2>{post.title}</h2>
        <p>
          Shared by {post.userFirstName} on{' '}
          <time dateTime={post.createdAt}>
            {formatDate(post.createdAt)}
          </time>
        </p>
      </div>
      <div className={post.isLiked ? 'liked' : ''}>
        <form action={action.bind(null, post.id)}>
          <LikeButton />
        </form>
      </div>
    </header>
    <p>{post.content}</p>
  </div>
</article>;


export const Posts = ({ posts }) => {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);

    if(updatedPostIndex === -1) return prevPosts;

    const updatedPost = { ...prevPosts[updatedPostIndex] };
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost;

    return newPosts;
  }); //To show instant like before updating it in database.

  if (!optimisticPosts || optimisticPosts.length === 0) return <p>There are no posts yet. Maybe start sharing some?</p>;

  const updatePost = async (postId) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  } 

  return <ul className="posts">
    {optimisticPosts.map((post) => (
      <li key={post.id}>
        <Post post={post} action={updatePost}/>
      </li>
    ))}
  </ul>;
}
