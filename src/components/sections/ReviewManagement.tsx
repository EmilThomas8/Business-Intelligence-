import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, RefreshCw } from "lucide-react";
import { StudentReview } from "../../types/review";
import { reviewService } from "../../services/review.service";
import ReviewEditor from "./ReviewEditor";

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReview, setEditingReview] = useState<StudentReview | null>(null);

  useEffect(() => {
    const unsubscribe = reviewService.subscribeToReviews((data) => {
      setReviews(data);
      setLoading(false);
    }, false);
    return () => unsubscribe();
  }, []);

  const handleEdit = (review?: StudentReview) => {
    setEditingReview(review || null);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <ReviewEditor review={editingReview || undefined} onSave={handleSave} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Review Management</h2>
        <button onClick={() => handleEdit()} className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-lg text-sm font-bold">
          <Plus className="w-4 h-4 inline" /> Add Review
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><RefreshCw className="animate-spin text-cyan-400" /></div>
      ) : (
        <div className="bg-[#0E1220] rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-[#121626] border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{review.studentName}</td>
                  <td className="px-6 py-4">{review.status}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(review)} className="p-2 hover:text-cyan-400"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => reviewService.deleteReview(review.id)} className="p-2 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
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
