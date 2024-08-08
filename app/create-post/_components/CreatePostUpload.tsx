"use client";
import { Box, Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbPhotoPlus } from "react-icons/tb";

// Define the form data type
interface PostFormData {
  title: string;
  // authorId: number;
  tags: string;
  imageUrl: string; // Store the uploaded image URL
}

const CreatePostUpload = () => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the uploaded image URL
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormData>();

  // This function will handle form submission
  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    if (!imageUrl) {
      setImageError(true);
      return;
    }
    setImageError(false);

    try {
      // Send form data to the server
      await axios.post("/api/create-post", { ...data, imageUrl });

      // Redirect to the home page after successful submission
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result.info !== "string" && result.info!.secure_url) {
      setImageUrl(result.info!.secure_url); // Set the state with the image URL
      setValue("imageUrl", result.info!.secure_url); // Set the imageUrl field in the form data
      setImageError(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Flex direction="column" pt="3" gap="6">
          <Text size="6">Create Post</Text>
          <Flex justify="start" align="center" gap="4">
            {/* Display the uploaded image */}

            {imageUrl !== null ? (
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

          {/* Display error message if image is not uploaded */}
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
            <Text>Tags</Text>
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
          <Button type="submit">Publish</Button>
        </Flex>
      </form>
    </>
  );
};

export default CreatePostUpload;
