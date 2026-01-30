"use client";
import { Extension } from "@tiptap/core";
import FontFamily from "@tiptap/extension-font-family";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

// Custom Resizable Image Extension
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: null,
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("imageResize"),
        props: {
          handleDOMEvents: {
            mousedown(view, event) {
              const target = event.target;
              if (target.nodeName === "IMG") {
                const pos = view.posAtDOM(target, 0);
                const node = view.state.doc.nodeAt(pos);

                if (node && node.type.name === "image") {
                  const startX = event.clientX;
                  const startY = event.clientY;
                  const startWidth = target.offsetWidth;
                  const startHeight = target.offsetHeight;

                  const onMouseMove = (e) => {
                    const diffX = e.clientX - startX;
                    const diffY = e.clientY - startY;

                    // Calculate new dimensions while maintaining aspect ratio
                    const aspectRatio = startWidth / startHeight;
                    let newWidth = startWidth + diffX;
                    let newHeight = newWidth / aspectRatio;

                    // Minimum size
                    if (newWidth < 50) newWidth = 50;
                    if (newHeight < 50) newHeight = 50;

                    target.style.width = `${newWidth}px`;
                    target.style.height = `${newHeight}px`;
                  };

                  const onMouseUp = (e) => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);

                    const newWidth = parseInt(target.style.width);
                    const newHeight = parseInt(target.style.height);

                    const { tr } = view.state;
                    tr.setNodeMarkup(pos, null, {
                      ...node.attrs,
                      width: newWidth,
                      height: newHeight,
                    });
                    view.dispatch(tr);
                  };

                  if (
                    event.offsetX > target.offsetWidth - 20 &&
                    event.offsetY > target.offsetHeight - 20
                  ) {
                    event.preventDefault();
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", onMouseUp);
                    return true;
                  }
                }
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});

// Custom FontSize extension
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .updateAttributes("textStyle", { fontSize: null })
            .run();
        },
    };
  },
});

function Toolbar({ editor, imageInputRef }) {
  if (!editor) return null;

  const [fontSize, setFontSize] = useState(11);

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const increaseFontSize = () => {
    const newSize = fontSize + 1;
    setFontSize(newSize);
    editor.chain().focus().setFontSize(`${newSize}pt`).run();
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(6, fontSize - 1);
    setFontSize(newSize);
    editor.chain().focus().setFontSize(`${newSize}pt`).run();
  };

  const setCustomFontSize = (size) => {
    setFontSize(size);
    editor.chain().focus().setFontSize(`${size}pt`).run();
  };

  const btn = (active) =>
    `h-8 min-w-8 px-2 flex items-center justify-center rounded transition-colors text-sm font-medium ${
      active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
    }`;

  const separator = "w-px h-6 bg-gray-300 mx-1";

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto">
        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${btn(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
          title="Undo (Ctrl+Z)"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${btn(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
          title="Redo (Ctrl+Y)"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
            />
          </svg>
        </button>

        <div className={separator} />

        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive("italic"))}
          title="Italic (Ctrl+I)"
        >
          <span className="italic font-serif">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btn(editor.isActive("underline"))}
          title="Underline (Ctrl+U)"
        >
          <span className="underline">U</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btn(editor.isActive("strike"))}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </button>

        <div className={separator} />

        {/* Headings */}
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "p") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(value) })
                .run();
            }
          }}
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
                ? "2"
                : editor.isActive("heading", { level: 3 })
                  ? "3"
                  : "p"
          }
          className="h-8 px-2 pr-8 rounded border border-gray-300 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="p">Normal text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div className={separator} />

        {/* Font Family */}
        <select
          onChange={(e) => {
            if (e.target.value === "default") {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily(e.target.value).run();
            }
          }}
          className="h-8 px-2 pr-8 rounded border border-gray-300 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Arial</option>
          <option value="Comic Sans MS, Comic Sans">Comic Sans MS</option>
          <option value="serif">Times New Roman</option>
          <option value="monospace">Courier New</option>
          <option value="cursive">Cursive</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Impact, fantasy">Impact</option>
          <option value="Tahoma, sans-serif">Tahoma</option>
          <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
          <option value="Verdana, sans-serif">Verdana</option>
        </select>

        <div className={separator} />

        {/* Font Size */}
        <div className="flex items-center gap-1">
          <button
            onClick={decreaseFontSize}
            className={`${btn(false)} w-7`}
            title="Decrease font size"
          >
            <span className="text-lg leading-none">−</span>
          </button>
          <select
            value={fontSize}
            onChange={(e) => setCustomFontSize(parseInt(e.target.value))}
            className="h-8 w-16 px-1 rounded border border-gray-300 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          >
            {[
              6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48,
              72,
            ].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button
            onClick={increaseFontSize}
            className={`${btn(false)} w-7`}
            title="Increase font size"
          >
            <span className="text-lg leading-none">+</span>
          </button>
        </div>

        <div className={separator} />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive("bulletList"))}
          title="Bullet list"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btn(editor.isActive("orderedList"))}
          title="Numbered list"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className={separator} />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btn(editor.isActive({ textAlign: "left" }))}
          title="Align left"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4h14v2H3V4zm0 4h10v2H3V8zm0 4h14v2H3v-2zm0 4h10v2H3v-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btn(editor.isActive({ textAlign: "center" }))}
          title="Align center"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4h14v2H3V4zm2 4h10v2H5V8zm-2 4h14v2H3v-2zm2 4h10v2H5v-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btn(editor.isActive({ textAlign: "right" }))}
          title="Align right"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4h14v2H3V4zm4 4h10v2H7V8zm-4 4h14v2H3v-2zm4 4h10v2H7v-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={btn(editor.isActive({ textAlign: "justify" }))}
          title="Justify"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4h14v2H3V4zm0 4h14v2H3V8zm0 4h14v2H3v-2zm0 4h14v2H3v-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className={separator} />

        {/* Image Upload */}
        <button
          onClick={handleImageClick}
          className={btn(false)}
          title="Insert image"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function FileCreatePage() {
  const [title, setTitle] = useState("Untitled document");
  const imageInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [targetDepartments, setTargetDepartments] = useState([]);
  const router = useRouter();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result;
        if (src && editor) {
          editor.chain().focus().setImage({ src }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ResizableImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "resizable-image",
        },
      }),
    ],
    content: ``,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none",
      },
    },
  });

  const handleSave = async () => {
    if (!editor) return;

    setIsSaving(true);
    setError(null);

    try {
      // Get JSON content from editor
      const content = editor.getJSON();

      // TODO: Replace these with actual values from your auth/context
      // You should get these from your authentication system
      const organizationId = 1; // Replace with actual org ID
      const departmentId = 1; // Replace with actual department ID
      const staffId = 1; // Replace with actual staff ID

      const payload = {
        title,
        content: JSON.stringify(content), // Backend expects stringified JSON
        organizationId,
        departmentId,
        staffId,
        targetDepartments, // Array of department IDs to route the file to
      };

      const response = await fetch("http://localhost:5000/api/v1/file/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create file");
      }

      if (data.success) {
        console.log("File created successfully:", data.fileId);
        // Redirect to department archive
        router.push("/department/archive");
      } else {
        throw new Error(data.message || "Failed to create file");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save file");
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-normal outline-none border-none w-full text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="Untitled document"
          />

          <div className="flex items-center gap-2">
            {error && (
              <span className="text-sm text-red-600 mr-2">{error}</span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-1.5 rounded-md text-sm font-medium border transition
        ${
          isSaving
            ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
        }`}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar editor={editor} imageInputRef={imageInputRef} />

      {/* Editor Container */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="bg-white shadow-lg min-h-[1056px] p-16">
          <EditorContent editor={editor} className="min-h-full" />
        </div>
      </div>

      {/* Hidden Image Input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Custom Editor Styles */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 800px;
          font-family: "Arial", sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #000;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          cursor: move;
          border: 2px solid transparent;
          transition: border-color 0.2s;
          display: inline-block;
          position: relative;
          user-select: none;
        }

        .ProseMirror img:hover {
          border-color: #3b82f6;
        }

        .ProseMirror img.ProseMirror-selectednode {
          outline: 3px solid #3b82f6;
          border-color: transparent;
        }

        /* Resize handle indicator */
        .ProseMirror img.ProseMirror-selectednode::after {
          content: "";
          position: absolute;
          right: -2px;
          bottom: -2px;
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border: 2px solid white;
          cursor: nwse-resize;
          border-radius: 2px;
        }

        .ProseMirror img:hover::after {
          content: "";
          position: absolute;
          right: -2px;
          bottom: -2px;
          width: 12px;
          height: 12px;
          background: #93c5fd;
          border: 2px solid white;
          cursor: nwse-resize;
          border-radius: 2px;
        }

        .ProseMirror h1 {
          font-size: 26pt;
          font-weight: 400;
          margin-top: 0;
          margin-bottom: 12pt;
          line-height: 1.15;
        }

        .ProseMirror h2 {
          font-size: 18pt;
          font-weight: 400;
          margin-top: 18pt;
          margin-bottom: 6pt;
          line-height: 1.15;
        }

        .ProseMirror h3 {
          font-size: 14pt;
          font-weight: 400;
          margin-top: 16pt;
          margin-bottom: 4pt;
          line-height: 1.15;
        }

        .ProseMirror p {
          margin: 0 0 12pt 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 40px;
          margin: 0 0 12pt 0;
        }

        .ProseMirror ul li,
        .ProseMirror ol li {
          margin-bottom: 4pt;
        }

        .ProseMirror strong {
          font-weight: 700;
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror u {
          text-decoration: underline;
        }

        .ProseMirror s {
          text-decoration: line-through;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
