import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import PostEntry from "./PostEntry";

const PostCard = ({ post }) => {
  const [showPostEntry, setShowPostEntry] = useState(false);
  //state for counting comment whenever a new comment is added
  const [commentCount, setCommentCount] = useState(post?.comments?.length || 0);

  return (
    <article className="card mt-6 lg:mt-8">
      {showPostEntry ? (
        <PostEntry setShowModal={() => setShowPostEntry(false)} />
      ) : (
        <>
          <PostHeader setShowPostEntry={setShowPostEntry} post={post} />
          <PostBody poster={post?.image} content={post?.content} />
          <PostActions post={post} commentCount={commentCount} />
          <PostComments
            post={post}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
          />
        </>
      )}
    </article>
  );
};

export default PostCard;
