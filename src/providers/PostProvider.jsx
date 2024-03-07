import { useReducer, useState } from "react";
import { initialState, postReducer } from "../reducers/PostReducer";
import { PostContext } from "../context/Index";

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [showPostEntry, setShowPostEntry] = useState(false);

  return (
    <PostContext.Provider
      value={{ state, dispatch, showPostEntry, setShowPostEntry }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
