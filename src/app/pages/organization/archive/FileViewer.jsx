"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function FileViewer({ content }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content,
    // This is the key to fix SSR issues
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl",
      },
    },
    // Prevent SSR hydration mismatch
    immediatelyRender: false,
  });

  if (!editor) return null; // wait until editor is ready on client

  return <EditorContent editor={editor} />;
}
