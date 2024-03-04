import React from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import PostComments from "./PostComments";

const PostCard = ({ post }) => {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions postId={post?.id} commentCount={post?.comments?.length} />
      <PostComments post={post} />
    </article>
  );
};

export default PostCard;
