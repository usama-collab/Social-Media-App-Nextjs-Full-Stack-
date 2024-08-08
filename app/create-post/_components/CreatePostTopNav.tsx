import ButtonCreatePosts from "@/app/components/ButtonCreatePosts";
import { Flex, Box, TextField, Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const CreatePostTopNav = () => {
  // const router = useRouter();
  return (
    <>
      <Flex
        justify="center"
        gap="9"
        pb="3"
        pt="3"
        position="sticky"
        top="0"
        className="bg-gray-100"
      >
        <Box>
          <TextField.Root placeholder="Search the docs…">
            <TextField.Slot>
              <HiMiniMagnifyingGlass />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Box>
          <ButtonCreatePosts />
        </Box>
      </Flex>
    </>
  );
};

export default CreatePostTopNav;
