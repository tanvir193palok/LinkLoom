import { useState } from "react";
import PostCommentList from "./PostCommentList";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

const PostComments = ({ post, commentCount, setCommentCount }) => {
  const [showComments, setShowComments] = useState(false);

  //state for all comments
  const [comments, setComments] = useState(post?.comments);

  //state for a new comment
  const [comment, setComment] = useState("");
  const { auth } = useAuth();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const user = profile?.user ?? auth?.user;

  const addComment = async (e) => {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
          setCommentCount(commentCount + 1);
          setComment("");
          setShowComments(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-md focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => setShowComments(!showComments)}
        >
          {commentCount === 0 ? "No Comments" : "All Comment ▾"}
        </button>
      </div>
      {showComments && <PostCommentList comments={comments} />}
    </div>
  );
};

export default PostComments;
