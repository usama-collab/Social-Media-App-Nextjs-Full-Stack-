// "use client";
import { Box, Flex, Avatar, Text, Separator } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "../auth/authOptions";

const SideNavProfile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex flex-col mb-4 items-center justify-center">
        <img
          src={session?.user?.image!}
          alt="responsive"
          className="w-12 h-12 rounded-full overflow-hidden"
        />

        <h2 className="text-md font-bold mt-2">{session?.user?.name}</h2>
        <div className="flex justify-center space-x-4 mt-2 text-sm">
          <span>Posts</span>
          <span>Followers</span>
          <span>Following</span>
        </div>
      </div>

      {/* <Separator className="bg-gray-600 h-px my-4" /> */}
    </>
  );
};

export default SideNavProfile;
