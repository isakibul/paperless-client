"use client";

import { useEffect, useState } from "react";
import FileViewer from "./FileViewer"; // Your TipTap viewer component

export default function AllFilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/v1/file/all");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch files");

        // Parse TipTap JSON content
        const parsedFiles = data.data.map((f) => ({
          ...f,
          parsedContent: f.FileContent
            ? JSON.parse(f.FileContent.content)
            : null,
        }));

        setFiles(parsedFiles);
      } catch (err) {
        console.error("Fetch files error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading files...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Files</h1>

      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{file.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
              Created at: {new Date(file.createdAt).toLocaleString()}
            </p>

            {file.parsedContent ? (
              <div className="mb-4">
                <strong>Content:</strong>
                <FileViewer content={file.parsedContent} />
              </div>
            ) : (
              <p className="text-gray-400">No content</p>
            )}

            <div>
              <strong>Routed Departments:</strong>
              {file.fileDepartments?.length === 0 ? (
                <p>None</p>
              ) : (
                <ul className="list-disc list-inside">
                  {file.fileDepartments.map((fd) => (
                    <li key={fd.id}>
                      {fd.department?.departmentName ||
                        fd.department?.name ||
                        "Unknown"}{" "}
                      (View: {fd.canView ? "✅" : "❌"}, Edit:{" "}
                      {fd.canEdit ? "✅" : "❌"}, Sign:{" "}
                      {fd.canSign ? "✅" : "❌"})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
