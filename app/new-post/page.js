import { createPost } from "@/actions/posts";
import { PostForm } from "@/components/post-form";

const NewPostPage = () => <PostForm action={createPost}/>;

export default NewPostPage;