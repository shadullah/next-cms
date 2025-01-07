import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Tag {
  _id: string;
  tagName: string;
  slug: string;
}

interface SortableTagProps {
  tag: Tag;
}

export function SortableTag({ tag }: SortableTagProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tag._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded border cursor-move hover:bg-gray-50 transition-colors"
    >
      {tag.tagName}
    </div>
  );
}
