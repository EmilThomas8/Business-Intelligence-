import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, RefreshCw } from "lucide-react";
import { Course } from "../../types/course";
import { courseService } from "../../services/course.service";
import CourseEditor from "./CourseEditor";

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const loadCourses = async () => {
    setLoading(true);
    const data = await courseService.getAllCourses(false);
    setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEdit = (course?: Course) => {
    setEditingCourse(course || null);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    loadCourses();
  };

  if (isEditing) {
    return <CourseEditor course={editingCourse || undefined} onSave={handleSave} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Course Management</h2>
        <button onClick={() => handleEdit()} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 rounded-lg text-sm font-bold">
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><RefreshCw className="animate-spin text-cyan-400" /></div>
      ) : (
        <div className="bg-[#0E1220] rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-[#121626] border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{course.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-mono ${course.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{course.category}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(course)} className="p-2 hover:text-cyan-400"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => courseService.deleteCourse(course.id).then(loadCourses)} className="p-2 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
