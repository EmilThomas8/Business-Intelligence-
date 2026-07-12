import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Course } from "../../types/course";
import { courseService } from "../../services/course.service";
import { storageService } from "../../services/storage.service";
import { Plus, Trash2, Upload } from "lucide-react";

const courseSchema = z.object({
  title: z.string().min(1, "Required"),
  subtitle: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  durationHours: z.string().min(1, "Required"),
  courseLength: z.string().min(1, "Required"),
  status: z.enum(["Draft", "Published", "Archived"]),
  careerPaths: z.array(z.object({ title: z.string().min(1, "Required") }))
});

export default function CourseEditor({ course, onSave }: { course?: Course, onSave: () => void }) {
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      title: "",
      subtitle: "",
      slug: "",
      category: "",
      difficulty: "Beginner",
      durationHours: "",
      courseLength: "",
      status: "Draft",
      careerPaths: []
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "careerPaths" });

  const onSubmit = async (data: any) => {
    if (course) {
      await courseService.updateCourse(course.id, data);
    } else {
      await courseService.createCourse(data);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <input {...register("title")} placeholder="Course Title" className="p-3 bg-slate-900 border rounded-lg" />
        <input {...register("subtitle")} placeholder="Subtitle" className="p-3 bg-slate-900 border rounded-lg" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <select {...register("difficulty")} className="p-3 bg-slate-900 border rounded-lg text-white">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select {...register("status")} className="p-3 bg-slate-900 border rounded-lg text-white">
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">Career Paths</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input {...register(`careerPaths.${index}.title` as any)} className="flex-1 p-2 bg-slate-900 border rounded" />
            <button type="button" onClick={() => remove(index)} className="text-rose-400"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => append({ title: "" })} className="text-cyan-400 flex items-center gap-1"><Plus className="w-4 h-4" /> Add Path</button>
      </div>

      <button type="submit" className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg">Save Course</button>
    </form>
  );
}
