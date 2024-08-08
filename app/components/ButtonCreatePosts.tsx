"use client";
import { Box, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import router from "next/router";
import React from "react";
import { FaPlus } from "react-icons/fa";

const ButtonCreatePosts = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/create-post")}>
      {" "}
      <FaPlus />
      Create Posts
    </Button>
  );
};

export default ButtonCreatePosts;
