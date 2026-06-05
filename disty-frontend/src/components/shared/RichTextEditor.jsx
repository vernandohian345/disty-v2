import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Tulis sesuatu...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
      }),

      Underline,

      Placeholder.configure({
        placeholder,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Link.configure({
        openOnClick: false,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
    ],

    content,

    editorProps: {
      attributes: {
        class: "min-h-[300px] prose max-w-none focus:outline-none p-5",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addYoutubeVideo = () => {
    const url = prompt("Masukkan URL YouTube");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 360,
      });
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Masukkan URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();

      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  useEffect(() => {
    if (editor && content !== undefined) {
      editor.commands.setContent(content || "");
    }
  }, [editor, content]);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive("bold")
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive("italic")
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive("bulletList")
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive("blockquote")
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Quote
        </button>

        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive("link")
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Link
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive({ textAlign: "left" })
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Left
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive({ textAlign: "center" })
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Center
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive({ textAlign: "right" })
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Right
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200"
          }`}
        >
          Justify
        </button>

        <button
          type="button"
          onClick={addYoutubeVideo}
          className="px-3 py-1 rounded-lg text-sm font-medium bg-white border border-slate-200"
        >
          YouTube
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
