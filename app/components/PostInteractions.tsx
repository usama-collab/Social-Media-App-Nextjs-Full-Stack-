"use client";
import React, { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface PostInteractionsProps {
  postId: number;
  initialLikes: { name: string }[];
  initialIsLiked: boolean;
  initialIsSaved: boolean;
}

const PostInteractions: React.FC<PostInteractionsProps> = ({
  postId,
  initialLikes,
  initialIsLiked,
  initialIsSaved,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(initialIsSaved);

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
        const data = await response.json();
        setIsLiked(data.isLiked);
        setLikes(data.likes);
      } else {
        console.error("Failed to like/unlike post");
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/posts/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSaved(data.isSaved);
      } else {
        console.error("Failed to save/unsave post");
      }
    } catch (error) {
      console.error("Error saving/unsaving post:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            className={`text-gray-700 ${
              isLiked ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={handleLike}
          >
            <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button className="text-gray-700 hover:text-blue-500">
            <MessageCircle size={24} />
          </button>
          <button className="text-gray-700 hover:text-blue-500">
            <Send size={24} />
          </button>
        </div>
        <button
          className={`text-gray-700 ${
            isSaved ? "text-black" : "hover:text-black"
          }`}
          onClick={handleSave}
        >
          <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="font-semibold mb-2">
        {likes.length} {likes.length === 1 ? "like" : "likes"}
      </div>
      <div>
        {likes.length > 0 && (
          <span className="font-semibold">
            {likes.slice(0, 3).map((user, index) => (
              <React.Fragment key={user.name}>
                {index > 0 && ", "}
                {user.name}
              </React.Fragment>
            ))}
            {likes.length > 3 && ` and ${likes.length - 3} others`}
          </span>
        )}
      </div>
    </>
  );
};

export default PostInteractions;
