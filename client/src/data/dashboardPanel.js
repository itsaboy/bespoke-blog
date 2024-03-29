import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export const action = [
    {
      title: "Create a Blog Post",
      description: "Another to-do system you’ll try but eventually give up on.",
      icon: PlusIcon,
      background: "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
      action: "new blog",
    },
    {
      title: "Create an Image Post",
      description: "Stay on top of your deadlines, or don’t — it’s up to you.",
      icon: PlusIcon,
      background: "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
      action: "new image",
    },
    {
      title: "Delete a Blog Post",
      description: "Great for mood boards and inspiration.",
      icon: MinusIcon,
      background: "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
      action: "delete blog",
    },
    {
      title: "Delete an Image Post",
      description: "Track tasks in different stages of your project.",
      icon: MinusIcon,
      background: "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
      action: "delete image",
    },
  ];