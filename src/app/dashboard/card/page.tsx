"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core"; // Add this import
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTag } from "@/Components/shared/SortableTag/page";

interface Tag {
  _id: string;
  tagName: string;
  slug: string;
}

const CardPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    latest: false,
  });
  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: "selected-area",
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/v1/tags");
        const data = await response.json();
        if (data.success) {
          setAvailableTags(data.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast.error("Failed to load tags");
      }
    };

    fetchTags();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string);
    console.log("event start");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) {
      console.log("No valid drop target");
      return;
    }

    console.log("Active ID:", active.id);
    console.log("Dropped over ID:", over.id);

    if (over.id === over.id) {
      const draggedTag = availableTags.find((tag) => tag._id === active.id);
      console.log(availableTags);
      if (draggedTag) {
        console.log(draggedTag);
        setSelectedTag(draggedTag);
        console.log("Selected tag set to:", draggedTag);
      } else {
        console.error("Dragged tag not found in available tags");
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTag) {
      toast.error("Please select a tag");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      console.log(formData.title);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("latest", String(formData.latest));
      formDataToSend.append("tag", selectedTag._id);
      if (img) {
        formDataToSend.append("img", img);
      }

      //   console.log("FormData contents:");
      //   for (const pair of formDataToSend.entries()) {
      //     console.log(pair[0] + ": " + pair[1]);
      //   }

      const response = await fetch("/api/v1/cards", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Card created successfully!");
        setFormData({
          title: "",
          latest: false,
        });
        setImg(null);
        setSelectedTag(null);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating card:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create card"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Create New Card</h1>
        <Link
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-800"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Card Form */}
        <div className="col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="img" className="block mb-2">
                Image
              </label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="latest"
                name="latest"
                checked={formData.latest}
                onChange={handleInputChange}
                className="rounded"
              />
              <label htmlFor="latest">Mark as Latest</label>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <div>
                <label className="block mb-2">Selected Tag</label>
                <div
                  ref={setDroppableRef}
                  id="selected-area"
                  className="min-h-[100px] border-2 border-dashed rounded p-4 mb-4 bg-gray-50"
                >
                  {selectedTag ? (
                    <div className="bg-blue-100 p-2 rounded flex justify-between items-center">
                      <span>{selectedTag.tagName}</span>

                      <button
                        type="button"
                        onClick={() => setSelectedTag(null)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      Drop tag here
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-4">Available Tags</h2>
                <SortableContext
                  items={availableTags.map((tag) => tag._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {availableTags.map((tag) => (
                      <SortableTag key={tag._id} tag={tag} />
                    ))}
                  </div>
                </SortableContext>
              </div>

              <DragOverlay>
                {activeId ? (
                  <div className="bg-white p-2 rounded border shadow-lg">
                    {availableTags.find((tag) => tag._id === activeId)?.tagName}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Creating..." : "Create Card"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
