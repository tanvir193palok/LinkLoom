import { useContext } from "react";
import { PostContext } from "../context/Index";

export const usePost = () => {
  return useContext(PostContext);
};
