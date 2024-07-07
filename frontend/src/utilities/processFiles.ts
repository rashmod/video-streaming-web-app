import { FileWithUrl } from "@/types/types";

export default function processFiles(
  fileList: FileList,
  MAX_FILE_SIZE?: number,
): FileWithUrl | undefined {
  const file = fileList[0];
  if (MAX_FILE_SIZE === undefined || file.size <= MAX_FILE_SIZE) {
    return { file, localURL: URL.createObjectURL(file) };
  }
}
