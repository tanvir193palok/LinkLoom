import { useContext } from "react";
import { ProfileContext } from "../context/Index";

export const useProfile = () => {
    return useContext(ProfileContext)
}