import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { StudentReview } from "../../types/review";
import { reviewService } from "../../services/review.service";

export default function StudentReviewCarousel() {
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = reviewService.subscribeToReviews((data) => {
      setReviews(data);
    }, true);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-[#0A0D18]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Student Success Stories</h2>
        <div 
          ref={scrollContainerRef}
          className="flex flex-row md:grid md:grid-cols-3 gap-8 overflow-x-auto pb-6 md:pb-0 scrollbar-none"
        >
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0E1220] p-6 rounded-2xl border border-white/5 flex-shrink-0 w-80 md:w-auto"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 mb-6">{review.review}</p>
                <div className="font-bold text-white">{review.studentName}</div>
                <div className="text-sm text-cyan-400">{review.course}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
