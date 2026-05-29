import { useState } from "react";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function QuizCard({ module }) {
  // ========================================
  // STATE
  // ========================================

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [submitted, setSubmitted] = useState(false);

  // ========================================
  // QUIZ DATA
  // ========================================

  const quiz = module?.quiz?.[0];

  // ========================================
  // NO QUIZ
  // ========================================

  if (!quiz) {
    return null;
  }

  // ========================================
  // CHECK ANSWER
  // ========================================

  const isCorrect = selectedAnswer === quiz.answer;

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    setSubmitted(true);
  };

  return (
    <section className="mt-8">
      {/* ========================================
          CONTAINER
      ======================================== */}

      <div
        className="
          overflow-hidden

          rounded-[40px]

          bg-white

          border
          border-black/5

          shadow-sm
        "
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div
          className="
            flex
            flex-col
            lg:flex-row

            lg:items-center
            lg:justify-between

            gap-6

            p-8
            lg:p-10

            border-b
            border-black/5
          "
        >
          {/* LEFT */}
          <div
            className="
              flex
              items-center
              gap-5
            "
          >
            {/* ICON */}
            <div
              className="
                w-16
                h-16

                rounded-3xl

                bg-orange-500

                flex
                items-center
                justify-center

                text-white
                text-2xl

                shrink-0
              "
            >
              <FaQuestionCircle />
            </div>

            {/* CONTENT */}
            <div>
              <h2
                className="
                  text-3xl
                  font-black
                  text-[#2B1D16]
                "
              >
                Quiz Materi
              </h2>

              <p
                className="
                  mt-2

                  text-black/50

                  leading-relaxed
                "
              >
                Kerjakan quiz berikut untuk menguji pemahamanmu.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              px-5
              py-3

              rounded-2xl

              bg-[#faf7f4]

              text-sm
              font-semibold
              text-black/60
            "
          >
            1 Pertanyaan
          </div>
        </div>

        {/* ========================================
            BODY
        ======================================== */}

        <div className="p-8 lg:p-10">
          {/* QUESTION */}
          <h3
            className="
              text-2xl
              font-black
              text-[#2B1D16]

              leading-snug
            "
          >
            {quiz.question}
          </h3>

          {/* OPTIONS */}
          <div className="mt-8 space-y-5">
            {quiz.options.map((option, index) => {
              const isSelected = selectedAnswer === option;

              const isAnswer = option === quiz.answer;

              return (
                <button
                  key={index}
                  onClick={() => !submitted && setSelectedAnswer(option)}
                  className={`
                      w-full

                      flex
                      items-center
                      justify-between

                      gap-4

                      text-left

                      p-6

                      rounded-3xl

                      border-2

                      transition-all
                      duration-300

                      ${
                        submitted
                          ? isAnswer
                            ? `
                              border-emerald-500
                              bg-emerald-50
                            `
                            : isSelected
                              ? `
                              border-red-500
                              bg-red-50
                            `
                              : `
                              border-black/5
                            `
                          : isSelected
                            ? `
                            border-orange-500
                            bg-orange-50
                          `
                            : `
                            border-black/5
                            hover:border-orange-200
                            hover:bg-[#faf7f4]
                          `
                      }
                    `}
                >
                  {/* LEFT */}
                  <div
                    className="
                        flex
                        items-center
                        gap-5
                      "
                  >
                    {/* NUMBER */}
                    <div
                      className={`
                          w-12
                          h-12

                          rounded-2xl

                          flex
                          items-center
                          justify-center

                          font-bold

                          ${
                            submitted
                              ? isAnswer
                                ? `
                                  bg-emerald-500
                                  text-white
                                `
                                : isSelected
                                  ? `
                                  bg-red-500
                                  text-white
                                `
                                  : `
                                  bg-[#f5f5f5]
                                `
                              : isSelected
                                ? `
                                bg-orange-500
                                text-white
                              `
                                : `
                                bg-[#f5f5f5]
                                text-black/60
                              `
                          }
                        `}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>

                    {/* OPTION */}
                    <span
                      className="
                          text-lg
                          font-semibold
                          text-[#2B1D16]
                        "
                    >
                      {option}
                    </span>
                  </div>

                  {/* ICON */}
                  {submitted && isAnswer && (
                    <FaCheckCircle
                      className="
                          text-emerald-500
                          text-2xl
                        "
                    />
                  )}

                  {submitted && isSelected && !isAnswer && (
                    <FaTimesCircle
                      className="
                          text-red-500
                          text-2xl
                        "
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* RESULT */}
          {submitted && (
            <div
              className={`
                mt-8

                rounded-[32px]

                p-6

                ${
                  isCorrect
                    ? `
                      bg-emerald-50
                      border
                      border-emerald-200
                    `
                    : `
                      bg-red-50
                      border
                      border-red-200
                    `
                }
              `}
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                {/* ICON */}
                <div
                  className={`
                    w-14
                    h-14

                    rounded-2xl

                    flex
                    items-center
                    justify-center

                    text-white
                    text-xl

                    shrink-0

                    ${
                      isCorrect
                        ? `
                          bg-emerald-500
                        `
                        : `
                          bg-red-500
                        `
                    }
                  `}
                >
                  {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                </div>

                {/* CONTENT */}
                <div>
                  <h3
                    className={`
                      text-2xl
                      font-black

                      ${
                        isCorrect
                          ? `
                            text-emerald-700
                          `
                          : `
                            text-red-700
                          `
                      }
                    `}
                  >
                    {isCorrect ? "Jawaban Benar!" : "Jawaban Kurang Tepat"}
                  </h3>

                  <p
                    className="
                      mt-3

                      leading-relaxed

                      text-black/60
                    "
                  >
                    {isCorrect
                      ? `
                        Selamat! Kamu sudah memahami
                        materi ini dengan baik.
                      `
                      : `
                        Jangan khawatir,
                        pelajari kembali materi
                        dan coba lagi ya.
                      `}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BUTTON */}
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="
                group

                mt-10

                inline-flex
                items-center
                gap-3

                h-14
                px-8

                rounded-2xl

                bg-[#2B1D16]
                hover:bg-orange-500

                disabled:opacity-50
                disabled:cursor-not-allowed

                text-white
                font-semibold

                transition-all
                duration-300
              "
            >
              <span>Submit Jawaban</span>

              <FaArrowRight
                className="
                  group-hover:translate-x-1
                  transition-all
                "
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
