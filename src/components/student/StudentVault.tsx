"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import {
  Search,
  Grid3x3,
  List,
  FileText,
  Image,
  File,
  Download,
  Share2,
  MoreVertical,
  Plus,
  FolderOpen,
  Upload,
} from "lucide-react";

export default function StudentVault() {
  const { data: session } = useSession();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);

  const documents = [
    { id: 1, name: "Sem5-Certificate.pdf", type: "pdf", size: "2.3 MB", date: "2024-06-10", category: "Certificates" },
    { id: 2, name: "Resume-Updated.pdf", type: "pdf", size: "156 KB", date: "2024-06-08", category: "Resume" },
    { id: 3, name: "ID-Card.jpg", type: "image", size: "890 KB", date: "2024-06-05", category: "ID Cards" },
    { id: 4, name: "Marksheet-Sem4.pdf", type: "pdf", size: "1.8 MB", date: "2024-05-20", category: "Marksheets" },
    { id: 5, name: "Internship-Offer.pdf", type: "pdf", size: "345 KB", date: "2024-05-15", category: "Certificates" },
    { id: 6, name: "Project-Report.docx", type: "doc", size: "4.5 MB", date: "2024-05-10", category: "Miscellaneous" },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "image":
        return <Image className="w-8 h-8 text-blue-500" />;
      case "doc":
        return <FileText className="w-8 h-8 text-blue-600" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  // Upload function (called only when user clicks Submit)
  // Upload function (called only when user clicks Submit)
const uploadMediaNow = async () => {
  if (!selectedFile) {
    alert("Please choose a file first.");
    return;
  }

  if (!session?.user?.id || !session?.user?.name) {
    alert("You must be signed in to upload.");
    return;
  }

  try {
    setUploading(true);
    setProgress(0);

    const username = session.user.name.replace(/\s+/g, "_");
    const userId = session.user.id; // 🔵 REAL Cognito ID
    const folderName = `vault/${username}`;
    const publicId = `${username}_${Date.now()}`;

    // Detect Type (IMAGE / PDF / DOCUMENT / VIDEO / OTHER)
    let fileType: "IMAGE" | "PDF" | "DOCUMENT" | "OTHER" | "VIDEO" = "OTHER";

    if (selectedFile.type.startsWith("image")) fileType = "IMAGE";
    else if (selectedFile.type === "application/pdf") fileType = "PDF";
    else if (selectedFile.type.startsWith("video")) fileType = "VIDEO";
    else if (
      selectedFile.type.includes("msword") ||
      selectedFile.name.endsWith(".doc") ||
      selectedFile.name.endsWith(".docx")
    ) fileType = "DOCUMENT";

    // Auto category detection
    let category:
      | "CERTIFICATES"
      | "DOCUMENTS"
      | "IDS"
      | "PHOTOS"
      | "ASSIGNMENTS"
      | "TRANSCRIPTS"
      | "OTHER" = "OTHER";

    const nameLower = selectedFile.name.toLowerCase();

    if (nameLower.includes("cert")) category = "CERTIFICATES";
    else if (nameLower.includes("id")) category = "IDS";
    else if (nameLower.includes("photo") || nameLower.includes("img"))
      category = "PHOTOS";
    else if (nameLower.includes("assign")) category = "ASSIGNMENTS";
    else if (nameLower.includes("transcript")) category = "TRANSCRIPTS";
    else category = "DOCUMENTS";

    // Prepare FormData
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folder", folderName);
    formData.append("tags", `vault,${username}`);
    formData.append("public_id", publicId);
    formData.append("userId", userId);
    formData.append("type", fileType);
    formData.append("category", category);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data?.cloudinary?.secure_url) {
      setLastUploadedUrl(data.cloudinary.secure_url);
      alert("Upload successful!");
    } else {
      console.error("Upload failed:", data);
      alert("Upload failed. Check console for details.");
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed. See console.");
  } finally {
    setUploading(false);
    setProgress(null);
    setSelectedFile(null);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden File Input */}
      <input
        type="file"
        id="vaultFileInput"
        className="hidden"
        onChange={(e) => {
          setSelectedFile(e.target.files?.[0] || null);
        }}
      />

      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Vault</h2>
            <p className="text-sm text-gray-500">Secure document storage</p>
          </div>

          {/* Button only opens file picker (no auto-upload) */}
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            id="uplodeNow"
            onClick={() => {
              document.getElementById("vaultFileInput")?.click();
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Upload
          </Button>
        </div>

        {/* Storage Bar */}
        <Card className="p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Storage Used</span>
            <span className="text-sm font-semibold text-gray-900">45 MB / 100 MB</span>
          </div>
          <Progress value={45} className="h-2" />
        </Card>
      </div>

      <div className="p-4 pb-24">
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>

          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" className="h-10 w-10" onClick={() => setViewMode("grid")}>
            <Grid3x3 className="w-4 h-4" />
          </Button>

          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" className="h-10 w-10" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full mb-4">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="all" className="text-xs py-2">All Files</TabsTrigger>
            <TabsTrigger value="recent" className="text-xs py-2">Recent</TabsTrigger>
            <TabsTrigger value="categories" className="text-xs py-2">Categories</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { name: "Certificates", count: 8, icon: "📜", color: "blue" },
            { name: "Resume", count: 3, icon: "📄", color: "purple" },
            { name: "ID Cards", count: 2, icon: "🪪", color: "green" },
            { name: "Marksheets", count: 5, icon: "📊", color: "amber" },
          ].map((category, idx) => (
            <Card key={idx} className="p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${category.color}-100 flex items-center justify-center text-xl`}>
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 text-sm truncate">{category.name}</h5>
                  <p className="text-xs text-gray-500">{category.count} files</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Documents List */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-3">All Documents</h4>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-3 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        {getFileIcon(doc.type)}
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>

                    <h5 className="font-medium text-gray-900 text-sm mb-1 truncate" title={doc.name}>
                      {doc.name}
                    </h5>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{doc.size}</span>
                      <Badge variant="outline" className="text-xs">{doc.type.toUpperCase()}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-3 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      {getFileIcon(doc.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 text-sm truncate">{doc.name}</h5>
                      <p className="text-xs text-gray-500">{doc.size} • {doc.date}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Upload Card */}
        <Card className="p-6 border-2 border-dashed border-gray-300 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Upload Documents</h4>
            <p className="text-sm text-gray-500 mb-4">Tap to browse or drag and drop files here</p>

            {/* Buttons: Choose Files + Submit */}
            <div className="flex items-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById("vaultFileInput")?.click()}>
                <Plus className="w-4 h-4 mr-2" />
                Choose Files
              </Button>

              {/* Submit button for user to confirm upload */}
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={uploadMediaNow}
                disabled={!selectedFile || uploading}
              >
                {uploading ? "Uploading..." : "Submit"}
              </Button>
            </div>

            {/* show selected file name */}
            {selectedFile && (
              <p className="text-xs text-gray-600 mt-3 truncate w-full max-w-md" title={selectedFile.name}>
                Selected: {selectedFile.name}
              </p>
            )}

            {/* optional basic progress UI */}
            {uploading && progress !== null && (
              <div className="w-full max-w-md mt-3">
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* show last uploaded preview if available */}
            {lastUploadedUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500">Last uploaded:</p>
                <img src={lastUploadedUrl} alt="last uploaded" className="mt-1 max-w-xs rounded" />
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
