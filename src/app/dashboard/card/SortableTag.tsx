// Components/shared/SortableTag/page.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableTagProps {
  tag: {
    _id: string;
    tagName: string;
    slug: string;
  };
}

export function SortableTag({ tag }: SortableTagProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tag._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded border cursor-move hover:bg-gray-50"
    >
      {tag.tagName}
    </div>
  );
}
