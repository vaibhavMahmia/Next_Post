import { Suspense } from 'react';

import { Posts } from '@/components/posts';
import { getPosts } from '@/lib/posts';



const LatestPosts = async () => {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

const Home = () => <>
  <h1>Welcome back!</h1>
  <p>{"Here's what you might've missed."}</p>
  <section id="latest-posts">
    <Suspense fallback={<p>Loading recent posts...</p>}>
      <LatestPosts />
    </Suspense>
  </section>
</>;

export default Home;