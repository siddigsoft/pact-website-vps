CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"image" text,
	"address" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
DROP TABLE "faqs" CASCADE;--> statement-breakpoint
ALTER TABLE "client_content" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "client_content" ADD COLUMN "url" text;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;