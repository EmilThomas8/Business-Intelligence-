import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StudentReview } from "../../types/review";
import { reviewService } from "../../services/review.service";
import { courseService } from "../../services/course.service";
import { Course } from "../../types/course";

const reviewSchema = z.object({
  studentName: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
  rating: z.coerce.number().min(1).max(5),
  review: z.string().min(1, "Required"),
  status: z.enum(["Draft", "Published", "Hidden"]),
  featured: z.boolean().default(false),
});

export default function ReviewEditor({ review, onSave }: { review?: StudentReview, onSave: () => void }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: review || {
      status: "Draft",
      featured: false,
      rating: 5
    }
  });

  useEffect(() => {
    courseService.getAllCourses(false).then(setCourses);
  }, []);

  const onSubmit = async (data: any) => {
    if (review) {
      await reviewService.updateReview(review.id, data);
    } else {
      await reviewService.createReview(data);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-slate-900 rounded-lg">
      <input {...register("studentName")} placeholder="Student Name" className="w-full p-2 bg-slate-800 rounded border border-white/10" />
      <select {...register("course")} className="w-full p-2 bg-slate-800 rounded border border-white/10 text-white">
        <option value="">Select a Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.title}>
            {c.title}
          </option>
        ))}
      </select>
      <textarea {...register("review")} placeholder="Review" className="w-full p-2 bg-slate-800 rounded border border-white/10" />
      <input type="number" {...register("rating")} placeholder="Rating (1-5)" className="w-full p-2 bg-slate-800 rounded border border-white/10" />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("featured")} /> Featured
      </label>
      <select {...register("status")} className="w-full p-2 bg-slate-800 rounded border border-white/10 text-white">
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
        <option value="Hidden">Hidden</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-cyan-500 text-slate-950 rounded">Save Review</button>
    </form>
  );
}
