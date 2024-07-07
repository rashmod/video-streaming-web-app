import { KB, MB } from "@/constants/constants";

export default function formatFileSize(bytes: number) {
  if (bytes < KB) return bytes + "B";
  if (bytes < MB) return (bytes / KB).toFixed(0) + "KB";
  return (bytes / MB).toFixed(2) + "MB";
}
