import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  // authorId: z.string(),
  tags: z
    .string()
    .transform((tags) => tags.split(",").map((tag) => tag.trim())),
  imageUrl: z.string().url(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, tags, imageUrl } = await request.json();

    const validation = createPostSchema.safeParse({
      title,
      tags,
      imageUrl,
    });

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const {
      title: validTitle,
      tags: validTags,
      imageUrl: validImageUrl,
    } = validation.data;

    try {
      // Get the user from the database
      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Create the new post in the database
      const newPost = await prisma.post.create({
        data: {
          title: validTitle,
          authorId: user.id,
          imageUrl: validImageUrl,
          tags: {
            connectOrCreate: validTags.map((tag: string) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
        include: {
          tags: true,
        },
      });

      return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
      console.error("Error creating post:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: { author: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post does not exist" },
        { status: 404 }
      );
    }

    // Check if the current user is the author of the post
    if (post.author.email !== session.user.email) {
      return NextResponse.json(
        { error: "Not authorized to delete this post" },
        { status: 403 }
      );
    }

    await prisma.post.delete({
      where: { id: post.id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
