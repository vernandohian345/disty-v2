import { useState } from "react";

import LearningSidebar from "./LearningSidebar";
import VideoPlayer from "./VideoPlayer";
import CourseProgress from "./CourseProgress";
import QuizCard from "./QuizCard";
import ExamBanner from "./ExamBanner";

export default function LearningLayout({ course }) {
  // ========================================
  // STATE
  // ========================================

  const [selectedModule, setSelectedModule] = useState(
    course?.modules?.[0] || null,
  );

  return (
    <section
      className="
        min-h-screen

        bg-[#fffaf5]

        pt-28
        pb-20
      "
    >
      <div
        className="
          max-w-[1700px]
          mx-auto

          px-4
        "
      >
        <div
          className="
            grid
            xl:grid-cols-[350px_1fr]

            gap-8
          "
        >
          {/* SIDEBAR */}
          <LearningSidebar
            course={course}
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
          />

          {/* MAIN */}
          <div>
            {/* VIDEO */}
            <VideoPlayer module={selectedModule} />

            {/* PROGRESS */}
            <CourseProgress course={course} />

            {/* QUIZ */}
            <QuizCard module={selectedModule} />

            {/* FINAL EXAM */}
            <ExamBanner course={course} />
          </div>
        </div>
      </div>
    </section>
  );
}
