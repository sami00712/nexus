"use client";
import React, { useRef, useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Share2,
  Eye,
  PenTool,
} from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import SignatureCanvas from "react-signature-canvas";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  status: "Draft" | "In Review" | "Signed";
  url?: string;
}

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Pitch Deck 2024.pdf",
      type: "PDF",
      size: "2.4 MB",
      lastModified: "2024-02-15",
      shared: true,
      status: "Draft",
      url: "/sample.pdf",
    },
  ]);

  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [signDoc, setSignDoc] = useState<Document | null>(null);
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 📂 File Upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const newDoc: Document = {
        id: documents.length + 1,
        name: file.name,
        type: file.type || "Document",
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: new Date().toISOString().split("T")[0],
        shared: false,
        status: "Draft",
        url: fileUrl,
      };
      setDocuments((prev) => [...prev, newDoc]);
    }
  };

  // 🖊 Save Signature
  const handleSaveSignature = () => {
    if (signDoc && sigCanvas.current) {
      const updatedDocs = documents.map((doc) =>
        doc.id === signDoc.id ? { ...doc, status: "Signed" } : doc
      );
      setDocuments(updatedDocs);
      setSignDoc(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <div>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
            accept=".pdf,.doc,.docx,.xlsx"
          />
          <Button
            leftIcon={<Upload size={18} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                All Documents
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="p-2 bg-primary-50 rounded-lg mr-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {doc.name}
                        </h3>
                        <Badge
                          variant={
                            doc.status === "Signed"
                              ? "success"
                              : doc.status === "In Review"
                              ? "warning"
                              : "secondary"
                          }
                          size="sm"
                        >
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>Modified {doc.lastModified}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewDoc(doc)}
                      >
                        <Eye size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSignDoc(doc)}
                      >
                        <PenTool size={18} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={18} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error-600"
                        onClick={() =>
                          setDocuments((docs) =>
                            docs.filter((d) => d.id !== doc.id)
                          )
                        }
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 h-3/4 flex flex-col">
            <h2 className="text-lg font-bold mb-4">
              Preview: {previewDoc.name}
            </h2>
            {previewDoc.url ? (
              <iframe
                src={previewDoc.url}
                title="doc-preview"
                className="w-full flex-1 border rounded-md"
              />
            ) : (
              <p className="text-gray-500">
                Preview not available for this file type.
              </p>
            )}
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setPreviewDoc(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {signDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Sign: {signDoc.name}</h2>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="blue"
              canvasProps={{
                className: "border w-full h-40 rounded-md",
              }}
            />
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={() => setSignDoc(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSignature}>Save Signature</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
