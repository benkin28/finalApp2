// pages/api/addTodo.js

import { db } from "../../../..";
import { todos, ToDo } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");

  try {
    const { id, title, description, ispending } = await req.json();

    await changeTodoStatus(id, title, description, ispending);
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

async function changeTodoStatus(
  id: number,
  title: string,
  description: string,
  ispending: boolean
) {
  console.log({ inDb: { id, title, description, ispending } });
  return await db
    .update(todos)
    .set({ ispending, title, description })
    .where(eq(todos.id, id));
}
