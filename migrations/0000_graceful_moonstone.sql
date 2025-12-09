CREATE TABLE "about_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"description" text NOT NULL,
	"image" text,
	"features" json NOT NULL,
	"client_retention_rate" integer DEFAULT 97,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "blog_article_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_article_id" integer NOT NULL,
	"project_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_article_projects_blog_article_id_project_id_unique" UNIQUE("blog_article_id","project_id")
);
--> statement-breakpoint
CREATE TABLE "blog_article_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_article_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_article_services_blog_article_id_service_id_unique" UNIQUE("blog_article_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "blog_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"category" text NOT NULL,
	"image" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"slug" text NOT NULL,
	"meta_description" text,
	"keywords" json DEFAULT '[]'::json,
	"author_name" text,
	"author_position" text,
	"author_avatar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"updated_by" integer,
	CONSTRAINT "blog_articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "client_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"type" text DEFAULT 'client' NOT NULL,
	"order_index" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"is_read" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "expertise_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"capabilities" json NOT NULL,
	"order_index" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"order_index" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "footer_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_description" text NOT NULL,
	"address" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"social_links" jsonb DEFAULT '[]'::jsonb,
	"copyright_text" text NOT NULL,
	"privacy_link" text DEFAULT '#',
	"terms_link" text DEFAULT '#',
	"sitemap_link" text DEFAULT '#',
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "hero_slides" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"description" text NOT NULL,
	"action_text" text NOT NULL,
	"action_link" text NOT NULL,
	"background_image" text NOT NULL,
	"category" text,
	"video_background" text,
	"accent_color" text,
	"order_index" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "impact_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" integer NOT NULL,
	"suffix" text,
	"label" text NOT NULL,
	"color" text DEFAULT '#E96D1F',
	"order_index" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "project_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"organization" text NOT NULL,
	"category" text,
	"bg_image" text,
	"icon" text,
	"duration" text,
	"location" text,
	"image" text,
	"status" text DEFAULT 'completed',
	"order_index" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "project_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_services_project_id_service_id_unique" UNIQUE("project_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "service_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"details" json NOT NULL,
	"image" text,
	"order_index" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "team_member_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_member_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_member_services_team_member_id_service_id_unique" UNIQUE("team_member_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"department" text NOT NULL,
	"location" text NOT NULL,
	"bio" text NOT NULL,
	"expertise" text[] NOT NULL,
	"image" text,
	"slug" text NOT NULL,
	"meta_description" text,
	"email" text NOT NULL,
	"linkedin" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "about_content" ADD CONSTRAINT "about_content_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_article_projects" ADD CONSTRAINT "blog_article_projects_blog_article_id_blog_articles_id_fk" FOREIGN KEY ("blog_article_id") REFERENCES "public"."blog_articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_article_projects" ADD CONSTRAINT "blog_article_projects_project_id_project_content_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_article_services" ADD CONSTRAINT "blog_article_services_blog_article_id_blog_articles_id_fk" FOREIGN KEY ("blog_article_id") REFERENCES "public"."blog_articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_article_services" ADD CONSTRAINT "blog_article_services_service_id_service_content_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_articles" ADD CONSTRAINT "blog_articles_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_content" ADD CONSTRAINT "client_content_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expertise_content" ADD CONSTRAINT "expertise_content_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_content" ADD CONSTRAINT "footer_content_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hero_slides" ADD CONSTRAINT "hero_slides_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "impact_stats" ADD CONSTRAINT "impact_stats_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_content" ADD CONSTRAINT "project_content_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_services" ADD CONSTRAINT "project_services_project_id_project_content_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_services" ADD CONSTRAINT "project_services_service_id_service_content_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_content" ADD CONSTRAINT "service_content_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_member_services" ADD CONSTRAINT "team_member_services_team_member_id_team_members_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_member_services" ADD CONSTRAINT "team_member_services_service_id_service_content_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service_content"("id") ON DELETE cascade ON UPDATE no action;