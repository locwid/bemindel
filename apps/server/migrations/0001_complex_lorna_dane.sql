CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_members" (
	"user_id" text,
	"project_id" text,
	"permissions" text[]
);
