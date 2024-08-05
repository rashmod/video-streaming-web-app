export type FileWithUrl = {
  file: File;
  localURL: string;
};

export type InitializeUploadResponse = {
  video: Video;
  videoState: VideoState;
  uploadProgress: UploadProgress;
};

export type UploadProgress = {
  id: string;
  uploadId: string;
  uploadKey: string;
  totalParts: number;
  uploadedParts: number;
  createdAt: string;
  updatedAt: string;
  videoId: string;
};

export type Video = {
  id: string;
  title: string;
  duration: number;
  thumbnailName: string;
  videoName: string;
  createdAt: string;
  userId: string;
};

export type VideoStatus = "UPLOADING" | "TRANSCODING" | "COMPLETED";

export type VideoState = {
  id: string;
  status: VideoStatus;
  createdAt: string;
  updatedAt: string;
  videoId: string;
};

export type User = {
  id: string;
  username: string;
  avatarUrl: string | null;
  createdAt: string;
};

export type VideoWithStatus = Video & { status: VideoStatus };
export type VideoWithUser = Video & { user: User };

export type Auth = { data: string } | undefined;

export type ServiceResponse<T> = SuccessResponse<T> | ErrorResponse<T>;

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  statusCode: number;
  errors: null;
};

export type ErrorResponse<T> = {
  success: false;
  message: string;
  data: null;
  statusCode: number;
  errors: T;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};

export type HomeVideo = {
  thumbnailUrl: string;
  id: string;
  title: string;
  duration: number;
  thumbnailName: string;
  videoName: string;
  createdAt: string;
  userId: string;
  name: string;
  avatarUrl: string | null;
};

export type WatchVideo = {
  video: Omit<HomeVideo, "avatarUrl" | "name"> & {
    videoUrl: { url: string; token: string };
  };
  user: {
    avatarUrl: string | null;
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type UserVideo = Omit<HomeVideo, "userId" | "name" | "avatarUrl">;

export type ProfileVideo = Omit<HomeVideo, "userId" | "name" | "avatarUrl"> & {
  status: VideoStatus;
};
