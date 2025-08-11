CREATE TABLE "issues" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"number" integer NOT NULL,
	"project_id" text NOT NULL,
	"creator_id" text,
	"assignee_id" text
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "creator_id" text;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assignee_id_users_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;