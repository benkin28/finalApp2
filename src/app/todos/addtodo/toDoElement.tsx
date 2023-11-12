"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
export default function ToDoElement() {
  const router = useRouter();
  const [toDo, setToDo] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleAdd = async (e: any) => {
    e.preventDefault();

    try {
      // Send a request to your server to add the todo to the database
      const response = await fetch("/api/addtodo", {
        method: "POST",
        body: JSON.stringify({
          title: toDo.title,
          description: toDo.description,
          creationdate: "",
          ispending: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 404) {
        console.log("API NOT FOUND 404");
      } else {
        console.log("Todo added successfully");
      }
    } catch (error) {
      console.error("Failed to add todo");
      console.log(error);
    }
    router.push(`/todos?refresh=5`);
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        handleAdd(e);
      }}
    >
      <h1>Add ToDo: </h1>
      <input
        required
        placeholder="Title"
        type="text"
        onChange={(e) => setToDo({ ...toDo, title: e.target.value })}
      />
      <textarea
        required
        placeholder="Description"
        onChange={(e) => setToDo({ ...toDo, description: e.target.value })}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
