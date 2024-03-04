import React from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import PostComments from "./PostComments";

const PostCard = ({ post }) => {
  return (
    <>
      <PostHeader post={post} />
      <PostBody />
      <PostActions />
      <PostComments />
    </>
  );
};

export default PostCard;
