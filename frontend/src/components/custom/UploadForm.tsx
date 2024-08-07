import { Clapperboard, Image } from "lucide-react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import FileUpload from "@/components/custom/FileUpload";

import formatFileSize from "@/utilities/formatFileSize";
import { THUMBNAIL_MAX_FILE_SIZE } from "@/constants/constants";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters long"),
  video: z.object({
    localURL: z.string().trim(),
    file: z
      .instanceof(File, { message: "Upload video file" })
      .refine((file) => file.type.match("video/*"), "Invalid file type"),
    height: z.number(),
    width: z.number(),
    duration: z.number(),
  }),
  thumbnail: z.object({
    localURL: z.string().trim(),
    file: z
      .instanceof(File, { message: "Upload image file" })
      .refine((file) => file.type.match("image/*"), "Invalid file type")
      .refine(
        (file) => file.size <= THUMBNAIL_MAX_FILE_SIZE,
        `File size must be less than ${formatFileSize(
          THUMBNAIL_MAX_FILE_SIZE,
        )}`,
      ),
  }),
});

const defaultFormValues: DefaultValues<Schema> = {
  title: "",
  video: {
    localURL: "",
    file: undefined,
    height: undefined,
    width: undefined,
    duration: undefined,
  },
  thumbnail: {
    file: undefined,
    localURL: "",
  },
};

export type Schema = z.infer<typeof schema>;

export default function UploadForm({
  handleUpload,
}: {
  handleUpload: (formaData: Schema) => Promise<void>;
}) {
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await handleUpload(data);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-10 grid w-1/2 gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <textarea
          placeholder="Title"
          id="title"
          className="h-16 max-h-32 min-h-12 w-full rounded-md border p-2"
          {...register("title", { required: "Title is required" })}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </div>
      <FileUpload
        register={register}
        trigger={trigger}
        error={errors.video?.file}
        setValue={setValue}
        resetField={resetField}
        watch={watch}
        name="video"
        type="video"
        acceptedFileTypes="video/*"
        Icon={Clapperboard}
        title="Click to upload or drag and drop video"
        subtitle="Any video format"
        id="video"
      />
      <FileUpload
        register={register}
        trigger={trigger}
        error={errors.thumbnail?.file}
        setValue={setValue}
        resetField={resetField}
        watch={watch}
        name="thumbnail"
        type="image"
        acceptedFileTypes="image/*"
        Icon={Image}
        title="Click to upload or drag and drop thumbnail"
        subtitle={`Any image format. Max size: ${formatFileSize(
          THUMBNAIL_MAX_FILE_SIZE,
        )}`}
        maxFileSize={THUMBNAIL_MAX_FILE_SIZE}
        id="thumbnail"
      />
      <Button className="w-full" type="submit">
        Upload
      </Button>
    </form>
  );
}
