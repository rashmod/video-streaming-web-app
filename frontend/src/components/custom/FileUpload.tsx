import { useState } from "react";
import { LucideProps, Trash2 } from "lucide-react";
import {
  FieldError,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import processFiles from "@/utilities/processFiles";
import { type FileWithUrl } from "@/types/types";
import { type Schema } from "@/components/custom/UploadForm";

export default function FileUpload({
  type,
  acceptedFileTypes,
  Icon,
  title,
  subtitle,
  id,
  register,
  name,
  error,
  setValue,
  resetField,
  trigger,
  watch,
  ...rest
}: FileUpload) {
  const [dragActive, setDragActive] = useState(false);

  function selectFile(file: FileWithUrl | undefined) {
    if (!file) return;

    setValue(name, file);
    trigger(name);
  }

  function handleFiles(files: FileList) {
    if (type === "image" && "maxFileSize" in rest) {
      const file = processFiles(files, rest.maxFileSize);
      selectFile(file);
    } else {
      const file = processFiles(files);
      selectFile(file);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    handleFiles(event.target.files);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer.files) return;

    handleFiles(event.dataTransfer.files);
    setDragActive(false);
    event.dataTransfer.clearData();
  }

  function handleDrag(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();

    switch (event.type) {
      case "dragenter":
      case "dragover":
        setDragActive(true);
        break;

      case "dragleave":
      case "drop":
        setDragActive(false);
        break;

      default:
        break;
    }
  }

  const file = watch(name);

  return (
    <div className="min-h-32 rounded-xl">
      {!file.file ? (
        <>
          <input
            {...register(name, {
              onChange: handleChange,
            })}
            type="file"
            accept={acceptedFileTypes}
            className="hidden"
            id={id}
          />
          <label
            htmlFor={id}
            className={cn(
              "group flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black transition duration-200 hover:bg-gray-100",
              {
                "bg-gray-100": dragActive,
              },
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon height={50} width={50} />
            <span>{title}</span>
            <span className="mt-1 text-xs text-slate-400 transition duration-200 group-hover:text-slate-700">
              {subtitle}
            </span>
          </label>
        </>
      ) : (
        <div className="mx-auto w-full">
          <div
            key={file.localURL}
            className="group relative aspect-video h-full w-full"
          >
            {type === "video" && (
              <video
                src={file.localURL}
                className="h-full w-full min-w-32 rounded-md object-cover"
                controls
              />
            )}
            {type === "image" && (
              <img
                src={file.localURL}
                className="w-full min-w-32 rounded-md object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute right-0 top-0 flex aspect-square w-12 origin-top-right items-center justify-center gap-4 rounded-md bg-black bg-opacity-90 text-white opacity-70 transition duration-200 hover:scale-150 hover:bg-opacity-100 group-hover:opacity-90">
              <Trash2
                className="hover:text-red-400"
                onClick={() => resetField(name)}
              />
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}

type ImageUpload = {
  type: "image";
  acceptedFileTypes: "image/*";
  maxFileSize: number;
};
type VideoUpload = {
  type: "video";
  acceptedFileTypes: "video/*";
};
type CommonProps = {
  Icon: React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  subtitle: string;
  id: string;
  register: UseFormRegister<Schema>;
  name: keyof Pick<Schema, "video" | "thumbnail">;
  error: FieldError | undefined;
  setValue: UseFormSetValue<Schema>;
  resetField: UseFormResetField<Schema>;
  trigger: UseFormTrigger<Schema>;
  watch: UseFormWatch<Schema>;
};
type FileUpload = CommonProps & (ImageUpload | VideoUpload);
