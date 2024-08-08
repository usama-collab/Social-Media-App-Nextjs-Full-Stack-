import { Box, Button, Container, Flex, TextField } from "@radix-ui/themes";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import CreatePostTopNav from "./_components/CreatePostTopNav";
import CreatePostUpload from "./_components/CreatePostUpload";

const CreatePostPage = () => {
  return (
    <Flex direction="column" align="center" className="w-full">
      {/* <CreatePostTopNav /> */}
      <CreatePostUpload />
    </Flex>
  );
};

export default CreatePostPage;
