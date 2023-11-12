"use client";
import { todos, ToDo } from "../../../../drizzle/schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function DescriptionCard(params: {
  id: number;
  title: string;
  description: string;
  creationdate: string;
  ispending: boolean;
}) {
  const [toDo, setToDo] = useState(params);
  const id = toDo.id;
  const [newTitle, setNewTitle] = useState(params.title);
  const [newDescription, setNewDescription] = useState(params.description);
  const [newStatus, setNewStatus] = useState(params.ispending);
  const [edit, setEdit] = useState(false);
  let date = new Date(params.creationdate).toISOString().slice(0, 10);
  const router = useRouter();
  console.log(newTitle);

  const handleDelete = async (e: any) => {
    e.preventDefault();

    try {
      // Send a request to your server to add the todo to the database
      const response = await fetch("/api/deletetodo", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        console.log("API NOT FOUND 404");
      } else {
        console.log("Todo deleted successfully");
      }
    } catch (error) {
      console.error("Failed to add todo");
      console.log(error);
    }
    router.push("/todos?refresh=1");
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();

    try {
      // Send a request to your server to add the todo to the database
      // console.log({ id, toDo.title, newDescription, newStatus });
      const response = await fetch("/api/changetodo", {
        method: "POST",
        body: JSON.stringify({
          id,
          title: newTitle,
          description: newDescription,
          creationdate: newStatus,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 404) {
        console.log("API NOT FOUND 404");
      } else {
        router.push(`/todos/${id}?refresh=1`);
        console.log("Todo deleted successfully");
      }
    } catch (error) {
      console.error("Failed to add todo");
      console.log(error);
    }
    router.push(`/todos/${id}?refresh=1`);
    setEdit(!edit);
  };

  const handleUpdateStatus = async (e: any) => {
    try {
      // Send a request to your server to add the todo to the database
      // console.log({ id, toDo.title, newDescription, newStatus });
      const response = await fetch("/api/updatestatus", {
        method: "POST",
        body: JSON.stringify({
          id,
          title: newTitle,
          description: newDescription,
          ispending: !newStatus,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 404) {
        console.log("API NOT FOUND 404");
      } else {
        console.log("Todo deleted successfully");
      }
    } catch (error) {
      console.error("Failed to add todo");
      console.log(error);
    }

    router.push(`/todos/${id}?refresh=1`);
  };

  if (edit) {
    return (
      <div className="flex flex-col items-center">
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => {
            handleEdit(e);
          }}
        >
          <h1 className="text-xl">Add ToDo: </h1>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <textarea
            placeholder="Description"
            onChange={(e) => setNewDescription(e.target.value)}
          >
            {newDescription}
          </textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center bg-gray-500 w-[80rem] h-[70rem] overflow-auto rounded-[3rem] ">
        <h1 className="text-6xl font-serif font-bold mt-10">{params.title}</h1>

        <p className="text-4xl font-serif mt-8 self-start ml-8 h-[45rem] overflow-auto">
          Description: {params.description}
        </p>
        <p className="text-2xl font-serif mt-8 self-start ml-8">Date: {date}</p>
        <button
          className="bg-purple-600 rounded-xl w-40 h-10 flex justify-center items-center"
          onClick={(e) => handleDelete(e)}
        >
          Delete
        </button>

        <button
          className="bg-purple-600 mt-4 rounded-xl w-40 h-10 flex justify-center items-center"
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
        <form
          id="checkbox"
          className="mt-4 bg-purple-600 rounded-xl w-40 h-10 flex justify-center items-center"
        >
          <p>Done: </p>
          <input
            type="checkbox"
            className="ml-8"
            checked={!newStatus}
            onClick={(e) => {
              handleUpdateStatus(e);
            }}
          />
        </form>
      </div>
    );
  }
}
