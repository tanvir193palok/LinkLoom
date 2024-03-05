import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import PostComments from "./PostComments";

const PostCard = ({ post }) => {
  //state for counting comment whenever a new comment is added
  const [commentCount, setCommentCount] = useState(post?.comments?.length || 0);

  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions post={post} commentCount={commentCount} />
      <PostComments
        post={post}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
      />
    </article>
  );
};

export default PostCard;
