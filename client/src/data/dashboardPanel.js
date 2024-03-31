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
    description:
      "Unleash your creativity by drafting engaging content for your audience.",
    icon: PencilSquareIcon,
    background:
      "bg-gradient-to-r from-pink-300 to-pink-500 border-b-2 border-pink-300 border-2",
    action: "new blog",
  },
  {
    title: "Create an Image Post",
    description:
      "Showcase your latest visuals in a post that captures eyes and hearts.",
    icon: PhotoIcon,
    background:
      "bg-gradient-to-r from-pink-300 to-pink-500 border-b-2 border-pink-300 border-2",
    action: "new image",
  },
  {
    title: "Add Contact Info",
    description:
      "Make it easy for visitors to reach out by providing your contact details.",
    icon: ChatBubbleBottomCenterTextIcon,
    background:
      "bg-gradient-to-r from-pink-300 to-pink-500 border-b-2 border-pink-300 border-2",
    action: "add contact",
  },
  {
    title: "Edit Home Page",
    description:
      "Refresh your home page to keep it lively and welcoming for new visitors.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change home",
  },
  {
    title: "Edit About Page",
    description:
      "Update your story to connect personally with your audience.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change about",
  },
  {
    title: "Edit Gallery Page",
    description:
      "Update the gallery page to reflect current themes or exhibitions.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change gallery",
  },
  {
    title: "Edit Blog Page",
    description:
      "Revitalize your blog page to enhance visitor engagement.",
    icon: DocumentTextIcon,
    background:
      "bg-gradient-to-r from-pink-500 to-pink-700 border-b-2 border-pink-500 border-2",
    action: "change blog",
  },
  {
    title: "Delete Contact Info",
    description:
      "Remove outdated contact information to keep your site's details accurate.",
    icon: TrashIcon,
    background:
      "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete contact",
  },
  {
    title: "Delete a Blog Post",
    description:
      "Clean up your blog by removing posts that are no longer relevant.",
    icon: TrashIcon,
    background:
      "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete blog",
  },
  {
    title: "Delete an Image Post",
    description:
      "Tidy up your image feed by discarding outdated or less impactful visuals.",
    icon: TrashIcon,
    background:
      "bg-gradient-to-r from-rose-500 to-rose-700 border-b-2 border-rose-500 border-2",
    action: "delete image",
  },
];
