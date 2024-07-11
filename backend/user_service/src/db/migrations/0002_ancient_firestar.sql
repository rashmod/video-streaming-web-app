ALTER TABLE "upload_progress" DROP CONSTRAINT "upload_progress_video_id_video_state_video_id_fk";
ALTER TABLE "transcoding_progress" DROP CONSTRAINT "transcoding_progress_video_id_video_state_video_id_fk";
--> statement-breakpoint
ALTER TABLE "video_state" DROP CONSTRAINT "video_state_video_id_unique";--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transcoding_progress" ADD CONSTRAINT "transcoding_progress_video_id_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "upload_progress" ADD CONSTRAINT "upload_progress_video_id_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_state" ADD CONSTRAINT "video_state_video_id_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
