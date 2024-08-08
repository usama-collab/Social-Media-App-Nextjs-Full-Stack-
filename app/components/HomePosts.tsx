// "use client";
import prisma from "@/prisma/client";
import { DropdownMenu } from "@radix-ui/themes";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import React from "react";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import HeartIcon from "./HeartIcon";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import PostInteractions from "./PostInteractions";

const HomePosts = async () => {
  const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likedBy: true, // Include this to get the likes information
      savedBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
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
              />
              <div className="flex flex-col items-start justify-start ml-3">
                <span className="font-semibold text-sm">
                  {post.author.name}
                </span>
                <span className="text-xs">{timeAgo(post.createdAt)}</span>
              </div>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button className="text-gray-500">
                  <MoreHorizontal size={20} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-white p-2 rounded-lg shadow-lg">
                <DropdownMenu.Item className="cursor-pointer p-2 hover:bg-gray-100 hover:text-black">
                  <Link href={`/post/${post.id}/edit`}>Edit</Link>
                </DropdownMenu.Item>
                <DeleteButton postId={post.id} />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <div className="px-4 py-2 font-semibold text-sm">{post.title}</div>
          <img src={post.imageUrl!} alt="Post" className="w-full rounded-md" />
          <div className="p-4">
            <PostInteractions
              postId={post.id}
              initialLikes={post.likedBy.map((user) => ({ name: user.name! }))}
              initialIsLiked={post.likedBy.some(
                (user) => user.name === session?.user?.name
              )}
              initialIsSaved={post.savedBy.some(
                (user) => user.name === session?.user?.name
              )}
            />
            {/* <div>
              <span className="font-semibold text-sm">{post.author.name}</span>
            </div> */}
          </div>
        </div>
      ))}
    </>
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

export default HomePosts;
