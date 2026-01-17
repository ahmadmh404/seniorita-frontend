"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  File,
  ImageIcon,
  Video,
  Music,
  FileText,
  Archive,
  X,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onCancel: () => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  onCancel,
  maxFiles = 10,
  maxSizePerFile = 50,
  acceptedTypes = [],
  className,
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    const type = file.type.toLowerCase();

    if (type.startsWith("image/")) return ImageIcon;
    if (type.startsWith("video/")) return Video;
    if (type.startsWith("audio/")) return Music;
    if (type.includes("text") || type.includes("document")) return FileText;
    if (
      type.includes("zip") ||
      type.includes("rar") ||
      type.includes("archive")
    )
      return Archive;

    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const validateFile = (file: File) => {
    if (file.size > maxSizePerFile * 1024 * 1024) {
      return `File size exceeds ${maxSizePerFile}MB limit`;
    }

    if (
      acceptedTypes.length > 0 &&
      !acceptedTypes.some((type) => file.type.includes(type))
    ) {
      return `File type not supported`;
    }

    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      if (selectedFiles.length + newFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
        return;
      }

      newFiles.push(file);
    });

    if (errors.length > 0) {
      console.error("File validation errors:", errors);
      // You could show these errors in a toast or alert
    }

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const sendFiles = () => {
    if (selectedFiles.length > 0) {
      // Simulate upload progress
      selectedFiles.forEach((file, index) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));

          if (progress >= 100) {
            clearInterval(interval);
            if (index === selectedFiles.length - 1) {
              // All files uploaded
              setTimeout(() => {
                onFilesSelected(selectedFiles);
              }, 500);
            }
          }
        }, 100);
      });
    }
  };

  const isUploading = Object.keys(uploadProgress).length > 0;

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25",
              "hover:border-primary hover:bg-primary/5 cursor-pointer"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              اسحب الصور التي تريد تحميلها إلى هذا الحقل
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              حمل ما يصل إلى {maxFiles} files, بحجم لا يزيد عن {maxSizePerFile}
              MB
            </p>
            {acceptedTypes.length > 0 && (
              <p className="text-xs text-muted-foreground">
                يدعم: {acceptedTypes.join(", ")}
              </p>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
            accept={acceptedTypes.join(",")}
          />

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">
                Selected Files ({selectedFiles.length})
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedFiles.map((file, index) => {
                  const IconComponent = getFileIcon(file);
                  const progress = uploadProgress[file.name] || 0;

                  return (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {file.type.split("/")[0] || "file"}
                          </Badge>
                        </div>

                        {isUploading && progress > 0 && (
                          <div className="mt-2">
                            <Progress value={progress} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">
                              {progress}% تحميلات
                            </p>
                          </div>
                        )}
                      </div>

                      {!isUploading && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 shrink-0"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel} disabled={isUploading}>
              إلغاء
            </Button>
            <Button
              onClick={sendFiles}
              disabled={selectedFiles.length === 0 || isUploading}
            >
              <Send className="h-4 w-4 mr-2" />
              تخميل {selectedFiles.length > 0 && `(${selectedFiles.length})`}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
