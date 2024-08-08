"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
// import DeleteButton from "@/components/DeleteButton";
import PostInteractions from "@/app/components/PostInteractions";
// import PostInteractions from "@/components/PostInteractions";
// import timeAgo from "@/utils/timeAgo"; // Ensure this utility is available

interface Post {
  id: number;
  title: string;
  imageUrl: string | null;
  author: {
    name: string | null;
    image: string | null;
  };
  createdAt: string;
  likedBy: { name: string }[];
  savedBy: { name: string }[];
}

const SavedPostsPage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const response = await fetch("/api/posts/like");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch saved posts");
      }
    };

    if (session) {
      fetchSavedPosts();
    }
  }, [session]);

  if (!session) {
    return <div>Please log in to view your saved posts.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-lg mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-2xl mt-5"
        >
          <div className="py-3 px-3 flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full overflow-hidden"
                src={post.author.image!}
                alt={post.author.name!}
              />
              <div className="flex flex-col items-start justify-start ml-3">
                <span className="font-semibold text-sm">
                  {post.author.name}
                </span>
                <span className="text-xs">{timeAgo(post.createdAt)}</span>
              </div>
            </div>
            <button className="text-gray-500">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="px-4 py-2 font-semibold text-sm">{post.title}</div>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="w-full rounded-md" />
          )}
          <div className="p-4">
            <PostInteractions
              postId={post.id}
              initialLikes={(post.likedBy || []).map((user) => ({
                name: user.name,
              }))}
              initialIsLiked={(post.likedBy || []).some(
                (user) => user.name === session?.user?.name
              )}
              initialIsSaved={(post.likedBy || []).some(
                (user) => user.name === session?.user?.name
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const timeAgo = (date: Date | string) => {
  const createdAt = new Date(date); // Ensure date is a Date object
  const seconds = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / 1000
  );
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval === 1 ? `${interval} year ago` : `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? `${interval} month ago` : `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? `${interval} day ago` : `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? `${interval} hour ago` : `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1
      ? `${interval} minute ago`
      : `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
};

export default SavedPostsPage;
