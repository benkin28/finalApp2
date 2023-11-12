// pages/api/addTodo.js

import { db } from "../../../..";
import { todos, ToDo } from "../../../../drizzle/schema";
import { timestamp } from "drizzle-orm/mysql-core";
import { time } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const path = "/todos";

  try {
    const { title, description, ispending } = await req.json();

    // Create a new todo object based on your schema
    const newTodo: {
      title: string;
      description: string;
      ispending: boolean;
    } = {
      title,
      description,
      ispending,

      // Add other properties here if needed
    };

    // Add the todo to your database
    await addTodoToDb(newTodo);

    // Return a success response
    revalidatePath("/todos");
    return new Response("Response", { status: 200 });
  } catch (error) {
    // Handle any errors that may occur during database insertion
    console.error("Error adding todo:", error);
    return new Response("Response", { status: 500 });
  }
}

async function addTodoToDb(todo: {
  title: string;
  description: string;
  ispending: boolean;
}) {
  return await db.insert(todos).values({
    title: todo.title,
    description: todo.description,
    ispending: todo.ispending,
  });
}
