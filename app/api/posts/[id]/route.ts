import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"; // Import your Prisma client instance
import { z } from "zod";

const updatePostSchema = z.object({
  title: z.string().min(1).max(255),
  // authorId: z.string(),
  tags: z
    .string()
    .transform((tags) => tags.split(",").map((tag) => tag.trim())),
  imageUrl: z.string().url(),
});

// GET: Fetch a single post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
      include: {
        tags: true, // Include tags in the response
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Transform the post data to match the expected frontend format
    const formattedPost = {
      ...post,
      tags: post.tags.map((tag) => tag.name), // Extract tag names
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  try {
    const body = await request.json();
    console.log("Received body:", body);

    const validation = updatePostSchema.safeParse(body);
    if (!validation.success) {
      console.error("Validation errors:", validation.error.errors);
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { title, tags, imageUrl } = validation.data;

    // Update the post in the database
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: {
        title,
        // authorId,
        imageUrl,
        tags: {
          set: [], // Disconnect all previous tags
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
