DO $$ BEGIN
 CREATE TYPE "public"."transcoding_status" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."video_status" AS ENUM('UPLOADING', 'TRANSCODING', 'COMPLETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "channels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"avatar_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resolution" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"video_bitrate" varchar(20) NOT NULL,
	"audio_bitrate" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resolution_name_unique" UNIQUE("name"),
	CONSTRAINT "resolution_width_height_unique" UNIQUE("width","height")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transcoding_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "transcoding_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"video_id" uuid NOT NULL,
	"resolution_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "upload_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"upload_id" varchar(255) NOT NULL,
	"video_name" varchar(255) NOT NULL,
	"thumbnail_name" varchar(255) NOT NULL,
	"total_parts" integer NOT NULL,
	"uploaded_parts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"video_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"duration" integer NOT NULL,
	"thumbnail_name" varchar(255) NOT NULL,
	"video_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"channel_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video_state" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" uuid NOT NULL,
	"status" "video_status" DEFAULT 'UPLOADING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "video_state_video_id_unique" UNIQUE("video_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transcoding_progress" ADD CONSTRAINT "transcoding_progress_video_id_video_state_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video_state"("video_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transcoding_progress" ADD CONSTRAINT "transcoding_progress_resolution_id_resolution_id_fk" FOREIGN KEY ("resolution_id") REFERENCES "public"."resolution"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "upload_progress" ADD CONSTRAINT "upload_progress_video_id_video_state_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video_state"("video_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video" ADD CONSTRAINT "video_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
