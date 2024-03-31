import {
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  PhotoIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export const action = [
  {
    title: "Create a Blog Post",
    description: "Another to-do system you’ll try but eventually give up on.",
    icon: PencilSquareIcon,
    background:
      "bg-gradient-to-r from-pink-300 to-pink-500 border-b-2 border-pink-300 border-2",
    action: "new blog",
  },
  {
    title: "Create an Image Post",
    description: "Stay on top of your deadlines, or don’t — it’s up to you.",
    icon: PhotoIcon,
    background:
    "bg-gradient-to-r from-pink-300 to-pink-500 border-b-2 border-pink-300 border-2",
    action: "new image",
  },
  {
    title: "Add Contact Info",
    description: "Track tasks in different stages of your project.",
    icon: ChatBubbleBottomCenterTextIcon,
    background:
    "bg-gradient-to-r from-pink-300 to-pink-500 border-b-2 border-pink-300 border-2",
    action: "add contact",
  },
  {
    title: "Edit Home Page",
    description: "Track tasks in different stages of your project.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change home",
  },
  {
    title: "Edit About Page",
    description: "Track tasks in different stages of your project.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change about",
  },
  {
    title: "Edit Gallery Page",
    description: "Track tasks in different stages of your project.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change gallery",
  },
  {
    title: "Edit Blog Page",
    description: "Track tasks in different stages of your project.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change blog",
  },
  {
    title: "Delete Contact Info",
    description: "Great for mood boards and inspiration.",
    icon: TrashIcon,
    background:
      "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete contact",
  },
  {
    title: "Delete a Blog Post",
    description: "Great for mood boards and inspiration.",
    icon: TrashIcon,
    background:
      "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete blog",
  },
  {
    title: "Delete an Image Post",
    description: "Track tasks in different stages of your project.",
    icon: TrashIcon,
    background:
      "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete image",
  },
];
