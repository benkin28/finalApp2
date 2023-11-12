// pages/api/addTodo.js

import { db } from "../../../..";
import { todos, ToDo } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import { time } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");

  try {
    const { id } = await req.json();

    await deleteTodo(id);
    if (path) {
      revalidatePath(path);
    }
    return new Response("Response", { status: 200 });
  } catch (error) {
    // Handle any errors that may occur during database insertion
    console.error("Error adding todo:", error);
    return new Response("Response", { status: 500 });
  }
}

async function deleteTodo(id: number) {
  return await db.delete(todos).where(eq(todos.id, id));
}
