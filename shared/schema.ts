import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
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
  status: text("status", { enum: Object.values(ProjectStatus) }).default(ProjectStatus.COMPLETED),
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

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  company: true,
  subject: true,
  message: true,
});



export const insertExpertiseContentSchema = createInsertSchema(expertiseContent).pick({
  title: true,
  description: true,
  icon: true,
  capabilities: true,
  order_index: true,
  updated_by: true,
});

export const insertServiceContentSchema = createInsertSchema(serviceContent).pick({
  title: true,
  description: true,
  details: true,
  image: true,
  order_index: true,
  updated_by: true,
});

export const insertClientContentSchema = createInsertSchema(clientContent).pick({
  name: true,
  logo: true,
  type: true,
  description: true,
  url: true,
  order_index: true,
  updated_by: true,
});

export const insertProjectContentSchema = createInsertSchema(projectContent).pick({
  title: true,
  description: true,
  organization: true,
  category: true,
  bg_image: true,
  icon: true,
  duration: true,
  location: true,
  image: true,
  status: true,
  order_index: true,
  updated_by: true,
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  city: true,
  country: true,
  image: true,
  address: true,
  updated_by: true,
});


export const insertBlogArticleSchema = createInsertSchema(blogArticles).pick({
  title: true,
  excerpt: true,
  content: true,
  category: true,
  image: true,
  status: true,
  slug: true,
  meta_description: true,
  keywords: true,
  author_name: true,
  author_position: true,
  author_avatar: true,
  published_at: true,
  updated_by: true,
});

export const insertBlogArticleServiceSchema = createInsertSchema(blogArticleServices).pick({
  blog_article_id: true,
  service_id: true,
});

export const insertBlogArticleProjectSchema = createInsertSchema(blogArticleProjects).pick({
  blog_article_id: true,
  project_id: true,
});

export const insertProjectServiceSchema = createInsertSchema(projectServices).pick({
  project_id: true,
  service_id: true,
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

export const insertFooterContentSchema = createInsertSchema(footerContent).pick({
  company_description: true,
  address: true,
  phone: true,
  email: true,
  social_links: true,
  copyright_text: true,
  privacy_link: true,
  terms_link: true,
  sitemap_link: true,
  updated_by: true,
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

export const insertTeamMemberSchema = createInsertSchema(teamMembersTable).pick({
  name: true,
  position: true,
  department: true,
  location: true,
  bio: true,
  expertise: true,
  image: true,
  slug: true,
  metaDescription: true,
  email: true,
  linkedin: true,
});

export const insertTeamMemberServiceSchema = createInsertSchema(teamMemberServices).pick({
  team_member_id: true,
  service_id: true,
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

export const insertHeroSlideSchema = createInsertSchema(heroSlides).pick({
  title: true,
  subtitle: true,
  description: true,
  actionText: true,
  actionLink: true,
  backgroundImage: true,
  category: true,
  videoBackground: true,
  accentColor: true,
  order_index: true,
  updated_by: true,
});

export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type HeroSlide = typeof heroSlides.$inferSelect;

export const insertAboutContentSchema = createInsertSchema(aboutContent).pick({
  title: true,
  subtitle: true,
  description: true,
  image: true,
  features: true,
  client_retention_rate: true,
  updated_by: true,
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

export type InsertProjectService = z.infer<typeof insertProjectServiceSchema>;
export type ProjectService = typeof projectServices.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;
