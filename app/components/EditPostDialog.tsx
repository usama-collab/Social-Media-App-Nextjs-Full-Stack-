"use client";
import { Box, Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbPhotoPlus } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the form data type
interface PostFormData {
  title: string;
  // authorId: number;
  tags: string;
  imageUrl: string;
}

interface Post extends Omit<PostFormData, "tags"> {
  id: string;
  tags: string[];
}

const fetchPost = async (id: string): Promise<Post> => {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
};

const EditPost = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormData>();

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      // setValue("authorId", post.authorId);
      // Ensure post.tags is an array before calling join
      setValue("tags", Array.isArray(post.tags) ? post.tags.join(", ") : "");
      setImageUrl(post.imageUrl);
    }
  }, [post, setValue]);

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    if (!imageUrl) {
      setImageError(true);
      return;
    }
    setImageError(false);

    try {
      await axios.patch(`/api/posts/${id}`, { ...data, imageUrl });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result.info !== "string" && result.info?.secure_url) {
      setImageUrl(result.info.secure_url);
      setValue("imageUrl", result.info.secure_url);
      setImageError(false);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading post: {(error as Error).message}</Text>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Flex direction="column" pt="3" gap="6">
          <Text size="6">Edit Post</Text>
          <Flex justify="start" align="center" gap="4">
            {/* Display the uploaded image */}
            {imageUrl ? (
              <Box mt="2">
                <CldImage
                  src={imageUrl}
                  alt="Uploaded Image"
                  width="250"
                  height="250"
                  style={{ borderRadius: "8px" }}
                />
              </Box>
            ) : (
              <TbPhotoPlus size={70} />
            )}

            <CldUploadWidget uploadPreset="cl2dgyf9" onSuccess={handleSuccess}>
              {({ open }) => (
                <Button type="button" onClick={() => open()}>
                  Upload an Image
                </Button>
              )}
            </CldUploadWidget>
          </Flex>

          {imageError && <Text color="red">Image is required</Text>}

          <Flex direction="column" gap="3">
            <Text>Caption</Text>
            <TextArea
              placeholder="What's on your mind?"
              {...register("title", { required: "Caption is required" })}
            />
            {errors.title && <Text color="red">{errors.title.message}</Text>}
          </Flex>
          <Flex direction="column" gap="3">
            <Text>Tags (comma separated)</Text>
            <TextField.Root
              placeholder="tag1, tag2"
              {...register("tags", {
                required: "At least one tag is required",
              })}
            />
            {errors.tags && <Text color="red">{errors.tags.message}</Text>}
          </Flex>
          {/* <Flex direction="column" gap="3">
            <Text>Author ID</Text>
            <TextField.Root
              type="number"
              placeholder="Author ID"
              {...register("authorId", {
                valueAsNumber: true,
                required: "Author ID is required",
              })}
            />
            {errors.authorId && (
              <Text color="red">{errors.authorId.message}</Text>
            )}
          </Flex> */}
          <Button type="submit">Update</Button>
        </Flex>
      </form>
    </>
  );
};

export default EditPost;
