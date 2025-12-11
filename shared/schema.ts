import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb, unique } from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  is_read: boolean("is_read").default(false),
});

// CMS Tables


export const expertiseContent = pgTable("expertise_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  capabilities: json("capabilities").$type<string[]>().notNull(),
  order_index: integer("order_index").default(0),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

export const serviceContent = pgTable("service_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  details: json("details").$type<string[]>().notNull(),
  image: text("image"),
  order_index: integer("order_index").default(0),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

export const clientContent = pgTable("client_content", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  type: text("type").notNull().default("client"), // 'client' or 'partner'
  description: text("description"),
  url: text("url"),
  order_index: integer("order_index").default(0),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

export const ProjectStatus = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ARCHIVED: 'archived'
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export const projectContent = pgTable("project_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  organization: text("organization").notNull(),
  category: text("category"),
  bg_image: text("bg_image"),
  icon: text("icon"),
  duration: text("duration"),
  location: text("location"),
  image: text("image"),
  status: text("status", { enum: ["draft", "in_progress", "completed", "archived"] }).default(ProjectStatus.COMPLETED),
  order_index: integer("order_index").default(0),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

// Project to services many-to-many relationship
export const projectServices = pgTable("project_services", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projectContent.id, { onDelete: 'cascade' }),
  service_id: integer("service_id").notNull().references(() => serviceContent.id, { onDelete: 'cascade' }),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    unq: unique().on(table.project_id, table.service_id)
  }
});

export const blogArticles = pgTable("blog_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  status: text("status").default("draft").notNull(), // 'published' or 'draft'
  slug: text("slug").notNull().unique(),
  meta_description: text("meta_description"),
  keywords: json("keywords").$type<string[]>().default([]),
  author_name: text("author_name"),
  author_position: text("author_position"),
  author_avatar: text("author_avatar"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  published_at: timestamp("published_at"),
  updated_by: integer("updated_by").references(() => users.id),
});

// Blog article to services many-to-many relationship
export const blogArticleServices = pgTable("blog_article_services", {
  id: serial("id").primaryKey(),
  blog_article_id: integer("blog_article_id").notNull().references(() => blogArticles.id, { onDelete: 'cascade' }),
  service_id: integer("service_id").notNull().references(() => serviceContent.id, { onDelete: 'cascade' }),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    unq: unique().on(table.blog_article_id, table.service_id)
  }
});

// Blog article to projects many-to-many relationship
export const blogArticleProjects = pgTable("blog_article_projects", {
  id: serial("id").primaryKey(),
  blog_article_id: integer("blog_article_id").notNull().references(() => blogArticles.id, { onDelete: 'cascade' }),
  project_id: integer("project_id").notNull().references(() => projectContent.id, { onDelete: 'cascade' }),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    unq: unique().on(table.blog_article_id, table.project_id)
  }
});

// Locations table
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  image: text("image"),
  address: text("address"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

// Insert schemas - Manual Zod definitions
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

export const insertContactMessageSchema = z.object({
  name: z.string(),
  email: z.string(),
  company: z.string().nullable().optional(),
  subject: z.string(),
  message: z.string(),
});



export const insertExpertiseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  capabilities: z.array(z.string()),
  order_index: z.number().optional(),
  updated_by: z.number().optional(),
});

export const insertServiceContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  details: z.array(z.string()),
  image: z.string().nullable().optional(),
  order_index: z.number().optional(),
  updated_by: z.number().optional(),
});

export const insertClientContentSchema = z.object({
  name: z.string(),
  logo: z.string().nullable().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  url: z.string().nullable().optional(),
  order_index: z.number().optional(),
  updated_by: z.number().optional(),
});

export const insertProjectContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  organization: z.string(),
  category: z.string().optional(),
  bg_image: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  status: z.enum(["draft", "in_progress", "completed", "archived"]).optional(),
  order_index: z.number().optional(),
  updated_by: z.number().optional(),
});

export const insertLocationSchema = z.object({
  city: z.string(),
  country: z.string(),
  image: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  updated_by: z.number().optional(),
});


export const insertBlogArticleSchema = z.object({
  title: z.string(),
  excerpt: z.string().optional(),
  content: z.string(),
  category: z.string(),
  image: z.string().nullable().optional(),
  status: z.string().optional(),
  slug: z.string(),
  meta_description: z.string().nullable().optional(),
  keywords: z.array(z.string()).optional(),
  author_name: z.string().nullable().optional(),
  author_position: z.string().nullable().optional(),
  author_avatar: z.string().nullable().optional(),
  published_at: z.date().optional(),
  updated_by: z.number().optional(),
});

export const insertBlogArticleServiceSchema = z.object({
  blog_article_id: z.number(),
  service_id: z.number(),
});

export const insertBlogArticleProjectSchema = z.object({
  blog_article_id: z.number(),
  project_id: z.number(),
});

export const insertProjectServiceSchema = z.object({
  project_id: z.number(),
  service_id: z.number(),
});

export const aboutContent = pgTable("about_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  image: text("image"),
  features: json("features").$type<{title: string, description: string, icon: string}[]>().notNull(),
  client_retention_rate: integer("client_retention_rate").default(97),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

// Footer Content Schema
export const footerContent = pgTable("footer_content", {
  id: serial("id").primaryKey(),
  company_description: text("company_description").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  social_links: jsonb("social_links").$type<{name: string, url: string, icon: string}[]>().default([]),
  copyright_text: text("copyright_text").notNull(),
  privacy_link: text("privacy_link").default("#"),
  terms_link: text("terms_link").default("#"),
  sitemap_link: text("sitemap_link").default("#"),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

export const insertFooterContentSchema = z.object({
  company_description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  social_links: z.array(z.object({
    name: z.string(),
    url: z.string(),
    icon: z.string()
  })).optional(),
  copyright_text: z.string(),
  privacy_link: z.string().optional(),
  terms_link: z.string().optional(),
  sitemap_link: z.string().optional(),
  updated_by: z.number().optional(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;



export type InsertExpertiseContent = z.infer<typeof insertExpertiseContentSchema>;
export type ExpertiseContent = typeof expertiseContent.$inferSelect;

export type InsertServiceContent = z.infer<typeof insertServiceContentSchema>;
export type ServiceContent = typeof serviceContent.$inferSelect;

export type InsertClientContent = z.infer<typeof insertClientContentSchema>;
export type ClientContent = typeof clientContent.$inferSelect;

export type InsertProjectContent = z.infer<typeof insertProjectContentSchema>;
export type ProjectContent = typeof projectContent.$inferSelect;



export type InsertBlogArticle = z.infer<typeof insertBlogArticleSchema>;
export type BlogArticle = typeof blogArticles.$inferSelect;

export type InsertBlogArticleService = z.infer<typeof insertBlogArticleServiceSchema>;
export type BlogArticleService = typeof blogArticleServices.$inferSelect;

export type InsertBlogArticleProject = z.infer<typeof insertBlogArticleProjectSchema>;
export type BlogArticleProject = typeof blogArticleProjects.$inferSelect;

export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type AboutContent = typeof aboutContent.$inferSelect;

export type InsertFooterContent = z.infer<typeof insertFooterContentSchema>;
export type FooterContent = typeof footerContent.$inferSelect;

// Team members table
export const teamMembersTable = pgTable('team_members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  department: text('department').notNull(),
  location: text('location').notNull(),
  bio: text('bio').notNull(),
  expertise: text('expertise').array().notNull(),
  image: text('image'),
  slug: text('slug').notNull(),
  metaDescription: text('meta_description'),
  email: text('email').notNull(),
  linkedin: text('linkedin').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Team member to services many-to-many relationship
export const teamMemberServices = pgTable("team_member_services", {
  id: serial("id").primaryKey(),
  team_member_id: integer("team_member_id").notNull().references(() => teamMembersTable.id, { onDelete: 'cascade' }),
  service_id: integer("service_id").notNull().references(() => serviceContent.id, { onDelete: 'cascade' }),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    unq: unique().on(table.team_member_id, table.service_id)
  }
});

export const insertTeamMemberSchema = z.object({
  name: z.string(),
  position: z.string(),
  department: z.string(),
  location: z.string(),
  bio: z.string(),
  expertise: z.array(z.string()),
  image: z.string().nullable().optional(),
  slug: z.string(),
  metaDescription: z.string().nullable().optional(),
  email: z.string(),
  linkedin: z.string(),
});

export const insertTeamMemberServiceSchema = z.object({
  team_member_id: z.number(),
  service_id: z.number(),
});

// Add team member types
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembersTable.$inferSelect;

export type InsertTeamMemberService = z.infer<typeof insertTeamMemberServiceSchema>;
export type TeamMemberService = typeof teamMemberServices.$inferSelect;

export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  actionText: text("action_text").notNull(),
  actionLink: text("action_link").notNull(),
  backgroundImage: text("background_image").notNull(),
  category: text("category"),
  videoBackground: text("video_background"),
  accentColor: text("accent_color"),
  order_index: integer("order_index").default(0),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

export const insertHeroSlideSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  actionText: z.string(),
  actionLink: z.string(),
  backgroundImage: z.string(),
  category: z.string().nullable().optional(),
  videoBackground: z.string().nullable().optional(),
  accentColor: z.string().nullable().optional(),
  order_index: z.number().optional(),
  updated_by: z.number().optional(),
});

export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type HeroSlide = typeof heroSlides.$inferSelect;

export const insertAboutContentSchema = z.object({
  title: z.string(),
  subtitle: z.string().nullable().optional(),
  description: z.string(),
  image: z.string().nullable().optional(),
  features: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string()
  })),
  client_retention_rate: z.number().optional(),
  updated_by: z.number().optional(),
});

export const impactStats = pgTable("impact_stats", {
  id: serial("id").primaryKey(),
  value: integer("value").notNull(),
  suffix: text("suffix"),
  label: text("label").notNull(),
  color: text("color").default('#E96D1F'),
  order_index: integer("order_index").default(0),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  updated_by: integer("updated_by").references(() => users.id),
});

export type InsertImpactStat = typeof impactStats.$inferInsert;
export type ImpactStat = typeof impactStats.$inferSelect;

export type InsertProjectService = z.infer<typeof insertProjectServiceSchema>;
export type ProjectService = typeof projectServices.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;
