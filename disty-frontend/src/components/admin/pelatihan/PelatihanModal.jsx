import { AnimatePresence, motion } from "framer-motion";

import PelatihanForm from "./PelatihanForm";
import { useEffect, useState } from "react";

export default function PelatihanModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
                        fixed
                        inset-0
                        z-50
                        bg-black/60
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        p-4
                        overflow-y-auto
                    "
        >
          {/* BACKDROP */}
          <div
            onClick={onClose}
            className="
                            absolute
                            inset-0
                        "
          ></div>

          {/* MODAL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
                            relative
                            w-full
                            max-w-6xl
                            rounded-[35px]
                            overflow-hidden
                            bg-white
                            shadow-2xl
                            border
                            border-slate-100
                        "
          >
            {/* TOP GLOW */}
            <div
              className="
                            absolute
                            top-0
                            left-0
                            right-0
                            h-2
                            bg-gradient-to-r
                            from-orange-500
                            via-orange-400
                            to-yellow-400
                        "
            ></div>

            {/* HEADER */}
            <div
              className="
                            relative
                            px-8
                            py-7
                            border-b
                            border-slate-100
                            bg-white
                        "
            >
              <div
                className="
                                flex
                                flex-col
                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                                gap-5
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
                                        bg-orange-100
                                        flex
                                        items-center
                                        justify-center
                                        text-orange-500
                                        text-3xl
                                        shadow-sm
                                    "
                  >
                    <i
                      className="
                                            fas
                                            fa-book-open
                                        "
                    ></i>
                  </div>

                  {/* TITLE */}
                  <div>
                    <h2
                      className="
                                            text-4xl
                                            font-black
                                            text-slate-800
                                        "
                    >
                      Edit Pelatihan
                    </h2>

                    <p
                      className="
                                            text-slate-500
                                            mt-2
                                        "
                    >
                      Update data pelatihan dengan mudah
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                                    flex
                                    items-center
                                    gap-3
                                "
                >
                  {/* STATUS */}
                  <div
                    className="
                                        hidden
                                        md:flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3
                                        rounded-2xl
                                        bg-orange-100
                                        text-orange-600
                                        font-bold
                                    "
                  >
                    <div
                      className="
                                            w-3
                                            h-3
                                            rounded-full
                                            bg-orange-500
                                            animate-pulse
                                        "
                    ></div>
                    Sedang Mengedit
                  </div>

                  {/* CLOSE */}
                  <button
                    onClick={onClose}
                    className="
                                            w-14
                                            h-14
                                            rounded-2xl
                                            bg-slate-100
                                            hover:bg-red-500
                                            hover:text-white
                                            transition
                                            text-slate-600
                                            text-xl
                                            shadow-sm
                                        "
                  >
                    <i
                      className="
                                            fas
                                            fa-times
                                        "
                    ></i>
                  </button>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div
              className="
                            max-h-[85vh]
                            overflow-y-auto
                            bg-slate-50
                        "
            >
              <div
                className="
                                p-7
                            "
              >
                {/* INFO CARD */}
                <div
                  className="
                                    bg-gradient-to-r
                                    from-orange-500
                                    to-orange-400
                                    rounded-[30px]
                                    p-6
                                    text-white
                                    mb-7
                                    relative
                                    overflow-hidden
                                "
                >
                  {/* BG */}
                  <div
                    className="
                                        absolute
                                        -right-10
                                        -top-10
                                        w-40
                                        h-40
                                        rounded-full
                                        bg-white/10
                                    "
                  ></div>

                  <div
                    className="
                                        relative
                                        z-10
                                        flex
                                        flex-col
                                        md:flex-row
                                        md:items-center
                                        md:justify-between
                                        gap-5
                                    "
                  >
                    <div>
                      <h3
                        className="
                                                text-2xl
                                                font-black
                                            "
                      >
                        {editData?.title}
                      </h3>
                      <p
                        className="
                                                text-orange-100
                                                mt-2
                                            "
                      >
                        Pastikan data yang diperbarui sudah benar sebelum
                        disimpan.
                      </p>
                    </div>
                    <div
                      className="
                                            flex
                                            items-center
                                            gap-3
                                            px-5
                                            py-3
                                            rounded-2xl
                                            bg-white/20
                                            backdrop-blur-sm
                                            font-bold
                                            w-fit
                                        "
                    >
                      <i
                        className="
                                                fas
                                                fa-pen
                                            "
                      ></i>
                      Mode Edit
                    </div>
                  </div>
                </div>
                {/* FORM */}
                <PelatihanForm onSubmit={onSubmit} editData={editData} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
