"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface LikeButtonProps {
  postId: number;
  initialIsLiked: boolean;
  initialLikesCount: number;
}

const LikeButton = ({
  postId,
  initialIsLiked,
  initialLikesCount,
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLike = async () => {
    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      } else {
        console.error("Failed to like/unlike post");
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  return (
    <button
      className={`text-gray-700 ${
        isLiked ? "text-red-500" : "hover:text-red-500"
      }`}
      onClick={handleLike}
    >
      <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
    </button>
  );
};

export default LikeButton;
