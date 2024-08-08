import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { likedBy: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const isLiked = post.likedBy.some((likedUser) => likedUser.id === user.id);

    let updatedPost;

    if (isLiked) {
      // Unlike the post
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          likedBy: {
            disconnect: { id: user.id },
          },
        },
        include: {
          likedBy: {
            select: { name: true },
          },
        },
      });
    } else {
      // Like the post
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          likedBy: {
            connect: { id: user.id },
          },
        },
        include: {
          likedBy: {
            select: { name: true },
          },
        },
      });
    }

    return NextResponse.json({
      isLiked: !isLiked,
      likes: updatedPost.likedBy,
    });
  } catch (error) {
    console.error("Error processing like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { likedPosts: { include: { author: true } } },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.likedPosts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
