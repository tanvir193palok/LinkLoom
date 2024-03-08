import { useReducer, useState } from "react";
import { initialState, postReducer } from "../reducers/PostReducer";
import { PostContext } from "../context/Index";

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [postToEdit, setPostToEdit] = useState(null);

  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        postToEdit,
        setPostToEdit,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
