import { Posts } from '@/components/posts';
import { getPosts } from '@/lib/posts';

// export const metadata = {
//   title: 'All Posts',
//   description: 'Browse all our posts.'
// }

export const generateMetadata = async () => {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts.`,
    description: 'Browse all our posts.'
  }
}

const FeedPage = async () => {
  const posts = await getPosts();
  return <>
    <h1>All posts by all users</h1>
    <Posts posts={posts} />
  </>;
}

export default FeedPage;