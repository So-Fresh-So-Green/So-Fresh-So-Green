import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../utils/mutations";
import Auth from "../../utils/auth";

function CommentButton() {
  const { postId } = useParams();
  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
    },
    variables: {
      postId: postId,
      body: comment,
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    Auth.loggedIn() && (
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-6 border-b border-gray-300 flex items-center">
          <div class="flex items-center justify-end rounded-lg w-full">
            <svg
              class="h-6 w-6 text-gray-700"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6578 3.34253C19.7928 2.47753 18.6427 2.00049 17.4197 2.00049C16.1967 2.00049 15.0467 2.47753 14.1817 3.34253L3.64872 13.8755C3.20372 14.3205 2.91371 14.8835 2.81071 15.5035L2.02073 20.2415C1.94073 20.7215 2.09875 21.2145 2.44175 21.5575C2.72675 21.8425 3.11372 21.9995 3.51072 21.9995C3.59372 21.9995 3.67571 21.9925 3.75871 21.9785L8.49674 21.1885C9.11674 21.0855 9.67973 20.7955 10.1247 20.3505L20.6578 9.8175C21.5228 8.95251 21.9997 7.80147 21.9997 6.57947C21.9997 5.35647 21.5228 4.20753 20.6578 3.34253ZM8.71073 18.9385C8.56273 19.0865 8.37474 19.1835 8.16874 19.2175L4.10673 19.8945L4.78373 15.8325C4.81773 15.6265 4.91472 15.4385 5.06272 15.2905L12.9687 7.38452L16.6167 11.0325L8.71073 18.9385ZM19.2438 8.40454L18.0307 9.61743L14.3827 5.96948L15.5957 4.75647C16.0827 4.26947 16.7317 4.00049 17.4197 4.00049C18.1087 4.00049 18.7568 4.26947 19.2438 4.75647C19.7308 5.24347 19.9997 5.89144 19.9997 6.58044C19.9997 7.26944 19.7308 7.91754 19.2438 8.40454Z"
                fill="#41416E"
              />
            </svg>
          </div>
        </div>
        <p>Post a comment</p>
        <form
          onSubmit={handleFormSubmit}
          class="flex items-center justify-end rounded-lg w-full"
        >
          {/* <div> */}
          <input
            type={"text"}
            placeholder={"comment.."}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={comment.trim() === ""}
            onClick={createComment}
          >
            Create Comment
          </button>
          {/* </div> */}
        </form>
      </div>
    )
  );
}

export default CommentButton;
