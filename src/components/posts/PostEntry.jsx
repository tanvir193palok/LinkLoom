import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import { actions } from "../../actions";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";

const PostEntry = ({ setShowModal }) => {
  const { auth } = useAuth();
  const { dispatch, postToEdit, setPostToEdit } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  const [post, setPost] = useState(() => {
    if (postToEdit) {
      return postToEdit;
    } else {
      return {
        content: "",
        image: "",
      };
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Function for handling Post Entry field change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPost((prevPost) => ({
      ...prevPost,
      image: file,
    }));
  };

  //Function for closing the Post Entry
  const closeModal = () => {
    setShowModal();
    setPostToEdit(null);
  };

  const handlePostSubmit = async () => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const formData = new FormData();
    formData.append("content", post.content);

    // Append image file if it exists in the post state
    if (post.image) {
      formData.append("image", post.image);
    }

    // Log each entry in the FormData
    for (const entry of formData.entries()) {
      console.log(entry);
    }

    try {
      let response;
      if (postToEdit) {
        response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postToEdit.id}`,
          formData
        );
      } else {
        response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
          formData
        );
        console.log(response);
      }

      if (response.status === 200) {
        if (postToEdit) {
          dispatch({ type: actions.post.DATA_EDITED, data: response.data });
          setPostToEdit(null);
        } else {
          dispatch({
            type: actions.post.DATA_CREATED,
            data: response.data,
          });
        }
        // Close this UI
        setShowModal();
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="card relative">
      <div className="flex justify-between">
        <h6 className="mb-3 ml-80 text-center text-lg font-bold lg:text-xl">
          {postToEdit ? "Edit Post" : "Create Post"}
        </h6>
        <button className="text-3xl mb-3" onClick={closeModal}>
          <IoMdCloseCircle />
        </button>
      </div>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            htmlFor="photo"
            className="btn-primary cursor-pointer !text-gray-100"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
            <input
              type="file"
              name="image"
              id="photo"
              className="hidden"
              accept="image/*"
              {...register("image")}
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
