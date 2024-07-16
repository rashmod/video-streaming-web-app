ALTER TABLE "transcoding_progress" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "upload_progress" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "video_state" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "upload_progress" ADD PRIMARY KEY ("video_id");--> statement-breakpoint
ALTER TABLE "video_state" ADD PRIMARY KEY ("video_id");--> statement-breakpoint
ALTER TABLE "transcoding_progress" ADD CONSTRAINT "transcoding_progress_video_id_resolution_id_pk" PRIMARY KEY("video_id","resolution_id");