import { db } from "../../../..";
import { todos } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import DescriptionCard from "./descriptionCard";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";



async function getToDo(id: number) {
  return await db
    .select({
      title: todos.title,
      description: todos.description,
      creationdate: todos.creationdate,
      ispending: todos.ispending,
    })
    .from(todos)
    .where(eq(todos.id, id));
}

export default async function Page({ params }: { params: { id: number } }) {
  revalidatePath(`/todos${params.id}`)
  const fetch = await getToDo(params.id);
  const todo = await fetch[0];
  if (!todo) notFound();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <DescriptionCard
        id={params.id}
        title={todo.title}
        description={todo.description}
        creationdate={String(todo.creationdate)}
        ispending={todo.ispending}
      ></DescriptionCard>
    </div>
  );
}
