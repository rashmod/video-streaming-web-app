import { FileWithUrl } from "@/types/types";

function processFiles(fileList: FileList): FileWithUrl;
function processFiles(
  fileList: FileList,
  MAX_FILE_SIZE: number,
): FileWithUrl | undefined;

function processFiles(
  fileList: FileList,
  MAX_FILE_SIZE?: number,
): FileWithUrl | undefined {
  const [file] = fileList;

  if (file && (MAX_FILE_SIZE === undefined || file.size <= MAX_FILE_SIZE)) {
    return { file, localURL: URL.createObjectURL(file) };
  }
}

export default processFiles;
