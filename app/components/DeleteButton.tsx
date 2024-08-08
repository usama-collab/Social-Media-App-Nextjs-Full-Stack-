"use client";
import { DropdownMenu } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import HideDeleteButton from "./HideDeleteButton";

interface Props {
  postId: number;
}

const DeleteButton = ({ postId }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const notify = () => toast("Deleted Successfully");

    try {
      await axios.delete("/api/create-post", { data: { postId } });
      notify();
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return <HideDeleteButton handleDelete={handleDelete} />;
};

export default DeleteButton;
