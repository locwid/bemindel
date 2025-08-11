ALTER TABLE "projects" ADD COLUMN "code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_code_unique" UNIQUE("code");