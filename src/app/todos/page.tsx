import TitleCard from "./titleCard";
import { db } from "../../..";
import { todos } from "../../../drizzle/schema";
import Link from "next/link";
export const dynamic = "force-dynamic";
import { revalidatePath } from "next/cache";

async function getTitle() {
  return await db.select({ id: todos.id, title: todos.title }).from(todos);
}

export default async function Page() {
  revalidatePath("/todos");
  const allTodos = await getTitle();
  return (
    <div className="flex flex-col items-center w-screen h-screen bg-white gap-4 overflow-auto">
      <h1 className="text-[4rem] font-serif font-bold mt-8 mb-4">Titles</h1>
      {allTodos.map((element) => (
        <Link key={element.id} href={`./todos/${String(element.id)}`}>
          <TitleCard
            title={element.title === null ? "null" : element.title}
          ></TitleCard>
        </Link>
      ))}
      <Link href="./todos/addtodo" className="flex justify-center items-center">
        <div className=" bg-purple-600 rounded-xl w-40 h-10 flex justify-center items-center">
          <p>Add ToDo</p>
        </div>
      </Link>
    </div>
  );
}
