import {
  users, contactMessages, expertiseContent, serviceContent,
  clientContent, projectContent, blogArticles, heroSlides, aboutContent,
  type User, type InsertUser,
  type ContactMessage, type InsertContactMessage,
  type ExpertiseContent, type InsertExpertiseContent,
  type ServiceContent, type InsertServiceContent,
  type ClientContent, type InsertClientContent,
  type ProjectContent, type InsertProjectContent,
  type BlogArticle, type InsertBlogArticle,
  type HeroSlide, type InsertHeroSlide,
  type AboutContent, type InsertAboutContent,
  blogArticleServices, InsertBlogArticleService, BlogArticleService,
  blogArticleProjects, InsertBlogArticleProject, BlogArticleProject,
  teamMembersTable, teamMemberServices,
  type TeamMember, type TeamMemberService,
  type InsertTeamMemberService, type InsertTeamMember,
  impactStats, type InsertImpactStat, type ImpactStat,
  footerContent, type InsertFooterContent, type FooterContent,
  locations, type Location, type InsertLocation
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, isNull, is, not, sql, or, like } from "drizzle-orm";
import bcrypt from "bcrypt";
import { pgTable, serial, text, timestamp, integer, unique, boolean, json } from 'drizzle-orm/pg-core';
import slugify from "slugify";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact form functionality
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;

  // Team Member functionality
  createTeamMember(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'> & { serviceIds?: number[] }): Promise<TeamMember>;
  getTeamMember(id: number): Promise<TeamMember>;
  getTeamMemberBySlug(slug: string): Promise<TeamMember>;
  getAllTeamMembers(): Promise<TeamMember[]>;
  updateTeamMember(id: number, data: Partial<TeamMember> & { serviceIds?: number[] }): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<boolean>;
  getTeamMemberServices(teamMemberId: number): Promise<ServiceContent[]>;

  // CMS functionality - Expertise Content
  getExpertiseContent(id: number): Promise<ExpertiseContent | undefined>;
  getAllExpertiseContent(): Promise<ExpertiseContent[]>;
  createExpertiseContent(content: InsertExpertiseContent): Promise<ExpertiseContent>;
  updateExpertiseContent(id: number, content: Partial<InsertExpertiseContent>): Promise<ExpertiseContent | undefined>;
  deleteExpertiseContent(id: number): Promise<boolean>;

  // CMS functionality - Service Content
  getServiceContent(id: number): Promise<ServiceContent | undefined>;
  getAllServiceContent(): Promise<ServiceContent[]>;
  createServiceContent(content: InsertServiceContent): Promise<ServiceContent>;
  updateServiceContent(id: number, content: Partial<InsertServiceContent>): Promise<ServiceContent | undefined>;
  deleteServiceContent(id: number): Promise<boolean>;

  // CMS functionality - Client Content
  getClientContent(id: number): Promise<ClientContent | undefined>;
  getAllClientContent(type?: string): Promise<ClientContent[]>;
  createClientContent(content: InsertClientContent): Promise<ClientContent>;
  updateClientContent(id: number, content: Partial<InsertClientContent>): Promise<ClientContent | undefined>;
  deleteClientContent(id: number): Promise<boolean>;

  // CMS functionality - Project Content
  getProjectContent(id: number): Promise<ProjectContent | undefined>;
  getAllProjectContent(): Promise<ProjectContent[]>;
  createProjectContent(content: InsertProjectContent): Promise<ProjectContent>;
  updateProjectContent(id: number, content: Partial<InsertProjectContent>): Promise<ProjectContent | undefined>;
  deleteProjectContent(id: number): Promise<boolean>;

  // CMS functionality - Blog Articles
  getBlogArticle(id: number): Promise<BlogArticle | undefined>;
  getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined>;
  getAllBlogArticles(publishedOnly?: boolean): Promise<BlogArticle[]>;
  createBlogArticle(article: InsertBlogArticle): Promise<BlogArticle>;
  updateBlogArticle(id: number, article: Partial<InsertBlogArticle>): Promise<BlogArticle | undefined>;
  deleteBlogArticle(id: number): Promise<boolean>;

  // Blog Article Services Relationships
  getBlogArticleServices(blogArticleId: number): Promise<ServiceContent[]>;
  addBlogArticleService(blogArticleId: number, serviceId: number): Promise<BlogArticleService>;
  removeBlogArticleService(blogArticleId: number, serviceId: number): Promise<boolean>;
  updateBlogArticleServices(blogArticleId: number, serviceIds: number[]): Promise<boolean>;

  // Blog Article Projects Relationships
  getBlogArticleProjects(blogArticleId: number): Promise<ProjectContent[]>;
  addBlogArticleProject(blogArticleId: number, projectId: number): Promise<BlogArticleProject>;
  removeBlogArticleProject(blogArticleId: number, projectId: number): Promise<boolean>;
  updateBlogArticleProjects(blogArticleId: number, projectIds: number[]): Promise<boolean>;

  // CMS functionality - Hero Slides
  getHeroSlide(id: number): Promise<HeroSlide | undefined>;
  getAllHeroSlides(): Promise<HeroSlide[]>;
  createHeroSlide(slide: InsertHeroSlide): Promise<HeroSlide>;
  updateHeroSlide(id: number, slide: Partial<InsertHeroSlide>): Promise<HeroSlide | undefined>;
  deleteHeroSlide(id: number): Promise<boolean>;

  // CMS functionality - About Content
  getAboutContent(): Promise<AboutContent | undefined>;
  createAboutContent(content: InsertAboutContent): Promise<AboutContent>;
  updateAboutContent(id: number, content: Partial<InsertAboutContent>): Promise<AboutContent | undefined>;

  // Impact Stats
  getAllImpactStats(): Promise<ImpactStat[]>;
  getImpactStat(id: number): Promise<ImpactStat | undefined>;
  createImpactStat(stat: InsertImpactStat): Promise<ImpactStat>;
  updateImpactStat(id: number, stat: Partial<InsertImpactStat>): Promise<ImpactStat | undefined>;
  deleteImpactStat(id: number): Promise<boolean>;

  // Footer Content
  getFooterContent(): Promise<FooterContent | undefined>;
  createFooterContent(content: InsertFooterContent): Promise<FooterContent>;
  updateFooterContent(id: number, content: Partial<InsertFooterContent>): Promise<FooterContent | undefined>;

  // Location functionality
  getLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  createLocation(data: InsertLocation): Promise<Location>;
  updateLocation(id: number, data: Partial<InsertLocation>): Promise<Location | undefined>;
  deleteLocation(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, password: hashedPassword })
      .returning();
    return user;
  }

  // Contact form functionality
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.created_at));
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const [contactMessage] = await db
      .update(contactMessages)
      .set({ is_read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return contactMessage;
  }

  // Team Member functionality
  async createTeamMember(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'> & { serviceIds?: number[] }): Promise<TeamMember> {
    const { serviceIds, ...memberData } = data;

    // Insert team member
    const [member] = await db
      .insert(teamMembersTable)
      .values({
        ...memberData,
        slug: slugify(memberData.name, { lower: true, strict: true }),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    // If serviceIds provided, create relationships
    if (serviceIds && serviceIds.length > 0) {
      await db
        .insert(teamMemberServices)
        .values(
          serviceIds.map(serviceId => ({
            team_member_id: member.id,
            service_id: serviceId
          }))
        );
    }

    return member;
  }

  async getTeamMember(id: number): Promise<TeamMember> {
    const [member] = await db
      .select()
      .from(teamMembersTable)
      .where(eq(teamMembersTable.id, id));
    return member;
  }

  async getTeamMemberBySlug(slug: string): Promise<TeamMember> {
    const [member] = await db
      .select()
      .from(teamMembersTable)
      .where(eq(teamMembersTable.slug, slug));
    return member;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    const members = await db
      .select()
      .from(teamMembersTable)
      .orderBy(asc(teamMembersTable.name));
    return members;
  }

  async updateTeamMember(id: number, data: Partial<TeamMember> & { serviceIds?: number[] }): Promise<TeamMember> {
    const { serviceIds, ...memberData } = data;

    // Update team member
    const [updatedMember] = await db
      .update(teamMembersTable)
      .set({
        ...memberData,
        updatedAt: new Date()
      })
      .where(eq(teamMembersTable.id, id))
      .returning();

    // If serviceIds provided, update relationships
    if (serviceIds !== undefined) {
      // Delete existing relationships
      await db
        .delete(teamMemberServices)
        .where(eq(teamMemberServices.team_member_id, id));

      // Add new relationships if any
      if (serviceIds.length > 0) {
        await db
          .insert(teamMemberServices)
          .values(
            serviceIds.map(serviceId => ({
              team_member_id: id,
              service_id: serviceId
            }))
          );
      }
    }

    return updatedMember;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    // Junction table entries will be automatically deleted due to ON DELETE CASCADE
    const result = await db
      .delete(teamMembersTable)
      .where(eq(teamMembersTable.id, id));
    return !!result;
  }

  async getTeamMemberServices(teamMemberId: number): Promise<ServiceContent[]> {
    const relations = await db
      .select({
        service: serviceContent
      })
      .from(teamMemberServices)
      .innerJoin(serviceContent, eq(teamMemberServices.service_id, serviceContent.id))
      .where(eq(teamMemberServices.team_member_id, teamMemberId));

    return relations.map(rel => rel.service);
  }

  // CMS functionality - Expertise Content
  async getExpertiseContent(id: number): Promise<ExpertiseContent | undefined> {
    const [content] = await db
      .select()
      .from(expertiseContent)
      .where(eq(expertiseContent.id, id));
    return content || undefined;
  }

  async getAllExpertiseContent(): Promise<ExpertiseContent[]> {
    return db
      .select()
      .from(expertiseContent)
      .orderBy(asc(expertiseContent.order_index));
  }

  async createExpertiseContent(content: InsertExpertiseContent): Promise<ExpertiseContent> {
    const [newContent] = await db
      .insert(expertiseContent)
      .values({
        ...content,
        capabilities: content.capabilities as string[]
      })
      .returning();
    return newContent;
  }

  async updateExpertiseContent(id: number, content: Partial<InsertExpertiseContent>): Promise<ExpertiseContent | undefined> {
    const [updatedContent] = await db
      .update(expertiseContent)
      .set({
        ...content,
        capabilities: content.capabilities ? (content.capabilities as string[]) : undefined,
        updated_at: new Date()
      })
      .where(eq(expertiseContent.id, id))
      .returning();
    return updatedContent;
  }

  async deleteExpertiseContent(id: number): Promise<boolean> {
    const result = await db
      .delete(expertiseContent)
      .where(eq(expertiseContent.id, id));
    return !!result;
  }

  // CMS functionality - Service Content
  async getServiceContent(id: number): Promise<ServiceContent | undefined> {
    const [content] = await db
      .select()
      .from(serviceContent)
      .where(eq(serviceContent.id, id));
    return content || undefined;
  }

  async getAllServiceContent(): Promise<ServiceContent[]> {
    return db
      .select()
      .from(serviceContent)
      .orderBy(asc(serviceContent.order_index));
  }

  async createServiceContent(content: InsertServiceContent): Promise<ServiceContent> {
    const [newContent] = await db
      .insert(serviceContent)
      .values({
        ...content,
        details: content.details as string[]
      })
      .returning();
    return newContent;
  }

  async updateServiceContent(id: number, content: Partial<InsertServiceContent>): Promise<ServiceContent | undefined> {
    const [updatedContent] = await db
      .update(serviceContent)
      .set({
        ...content,
        details: content.details ? (content.details as string[]) : undefined,
        updated_at: new Date()
      })
      .where(eq(serviceContent.id, id))
      .returning();
    return updatedContent;
  }

  async deleteServiceContent(id: number): Promise<boolean> {
    const result = await db
      .delete(serviceContent)
      .where(eq(serviceContent.id, id));
    return !!result;
  }

  // CMS functionality - Client Content
  async getClientContent(id: number): Promise<ClientContent | undefined> {
    const [content] = await db
      .select()
      .from(clientContent)
      .where(eq(clientContent.id, id));
    return content || undefined;
  }

  async getAllClientContent(type?: string): Promise<ClientContent[]> {
    if (type) {
      return db
        .select()
        .from(clientContent)
        .where(eq(clientContent.type, type))
        .orderBy(asc(clientContent.order_index));
    }

    return db
      .select()
      .from(clientContent)
      .orderBy(clientContent.type, asc(clientContent.order_index));
  }

  async createClientContent(content: InsertClientContent): Promise<ClientContent> {
    const [newContent] = await db
      .insert(clientContent)
      .values(content)
      .returning();
    return newContent;
  }

  async updateClientContent(id: number, content: Partial<InsertClientContent>): Promise<ClientContent | undefined> {
    const [updatedContent] = await db
      .update(clientContent)
      .set({
        ...content,
        updated_at: new Date()
      })
      .where(eq(clientContent.id, id))
      .returning();
    return updatedContent;
  }

  async deleteClientContent(id: number): Promise<boolean> {
    const result = await db
      .delete(clientContent)
      .where(eq(clientContent.id, id));
    return !!result;
  }

  // CMS functionality - Project Content
  async getProjectContent(id: number): Promise<ProjectContent | undefined> {
    const [content] = await db
      .select()
      .from(projectContent)
      .where(eq(projectContent.id, id));
    return content || undefined;
  }

  async getAllProjectContent(): Promise<ProjectContent[]> {
    return db
      .select()
      .from(projectContent)
      .orderBy(asc(projectContent.order_index));
  }

  async createProjectContent(content: InsertProjectContent): Promise<ProjectContent> {
    const [newContent] = await db
      .insert(projectContent)
      .values({
        ...content,
        updated_at: new Date()
      })
      .returning();
    return newContent;
  }

  async updateProjectContent(id: number, content: Partial<InsertProjectContent>): Promise<ProjectContent | undefined> {
    const [updatedContent] = await db
      .update(projectContent)
      .set({
        ...content,
        updated_at: new Date()
      })
      .where(eq(projectContent.id, id))
      .returning();
    return updatedContent;
  }

  async deleteProjectContent(id: number): Promise<boolean> {
    const result = await db
      .delete(projectContent)
      .where(eq(projectContent.id, id));
    return !!result;
  }

  // CMS functionality - Blog Articles
  async getBlogArticle(id: number): Promise<BlogArticle | undefined> {
    const [article] = await db
      .select()
      .from(blogArticles)
      .where(eq(blogArticles.id, id));
    return article || undefined;
  }

  async getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
    const [article] = await db
      .select()
      .from(blogArticles)
      .where(eq(blogArticles.slug, slug));
    return article || undefined;
  }

  async getAllBlogArticles(publishedOnly: boolean = false): Promise<BlogArticle[]> {
    let query = db
      .select()
      .from(blogArticles)
      .orderBy(desc(blogArticles.created_at));

    if (publishedOnly) {
      return query
        .where(and(
          eq(blogArticles.status, 'published'),
          not(isNull(blogArticles.published_at))
        ));
    }

    return query;
  }

  async createBlogArticle(article: InsertBlogArticle): Promise<BlogArticle> {
    // Set published_at if status is published
    if (article.status === 'published' && !article.published_at) {
      article.published_at = new Date();
    }

    const [newArticle] = await db
      .insert(blogArticles)
      .values({
        ...article,
        keywords: article.keywords ? (article.keywords as string[]) : []
      })
      .returning();
    return newArticle;
  }

  async updateBlogArticle(id: number, article: Partial<InsertBlogArticle>): Promise<BlogArticle | undefined> {
    // If changing status to published, set published_at if not already set
    if (article.status === 'published') {
      const existingArticle = await this.getBlogArticle(id);
      if (existingArticle && existingArticle.status !== 'published') {
        article.published_at = new Date();
      }
    }

    const [updatedArticle] = await db
      .update(blogArticles)
      .set({
        ...article,
        keywords: article.keywords ? (article.keywords as string[]) : undefined,
        updated_at: new Date()
      })
      .where(eq(blogArticles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteBlogArticle(id: number): Promise<boolean> {
    // Delete associated service and project relationships first
    await db
      .delete(blogArticleServices)
      .where(eq(blogArticleServices.blog_article_id, id));

    await db
      .delete(blogArticleProjects)
      .where(eq(blogArticleProjects.blog_article_id, id));

    const result = await db
      .delete(blogArticles)
      .where(eq(blogArticles.id, id));
    return !!result;
  }

  // Blog Article Services Relationship Methods
  async getBlogArticleServices(blogArticleId: number): Promise<ServiceContent[]> {
    const relations = await db
      .select({
        service: serviceContent
      })
      .from(blogArticleServices)
      .innerJoin(serviceContent, eq(blogArticleServices.service_id, serviceContent.id))
      .where(eq(blogArticleServices.blog_article_id, blogArticleId));

    return relations.map(rel => rel.service);
  }

  async addBlogArticleService(blogArticleId: number, serviceId: number): Promise<BlogArticleService> {
    // Check if relationship already exists
    const [existing] = await db
      .select()
      .from(blogArticleServices)
      .where(and(
        eq(blogArticleServices.blog_article_id, blogArticleId),
        eq(blogArticleServices.service_id, serviceId)
      ));

    if (existing) return existing;

    const [relation] = await db
      .insert(blogArticleServices)
      .values({
        blog_article_id: blogArticleId,
        service_id: serviceId
      })
      .returning();

    return relation;
  }

  async removeBlogArticleService(blogArticleId: number, serviceId: number): Promise<boolean> {
    const result = await db
      .delete(blogArticleServices)
      .where(and(
        eq(blogArticleServices.blog_article_id, blogArticleId),
        eq(blogArticleServices.service_id, serviceId)
      ));

    return !!result;
  }

  async updateBlogArticleServices(blogArticleId: number, serviceIds: number[]): Promise<boolean> {
    // Delete existing relationships
    await db
      .delete(blogArticleServices)
      .where(eq(blogArticleServices.blog_article_id, blogArticleId));

    // Add new relationships
    if (serviceIds.length > 0) {
      await db
        .insert(blogArticleServices)
        .values(
          serviceIds.map(serviceId => ({
            blog_article_id: blogArticleId,
            service_id: serviceId
          }))
        );
    }

    return true;
  }

  // Blog Article Projects Relationship Methods
  async getBlogArticleProjects(blogArticleId: number): Promise<ProjectContent[]> {
    const relations = await db
      .select({
        project: projectContent
      })
      .from(blogArticleProjects)
      .innerJoin(projectContent, eq(blogArticleProjects.project_id, projectContent.id))
      .where(eq(blogArticleProjects.blog_article_id, blogArticleId));

    return relations.map(rel => rel.project);
  }

  async addBlogArticleProject(blogArticleId: number, projectId: number): Promise<BlogArticleProject> {
    // Check if relationship already exists
    const [existing] = await db
      .select()
      .from(blogArticleProjects)
      .where(and(
        eq(blogArticleProjects.blog_article_id, blogArticleId),
        eq(blogArticleProjects.project_id, projectId)
      ));

    if (existing) return existing;

    const [relation] = await db
      .insert(blogArticleProjects)
      .values({
        blog_article_id: blogArticleId,
        project_id: projectId
      })
      .returning();

    return relation;
  }

  async removeBlogArticleProject(blogArticleId: number, projectId: number): Promise<boolean> {
    const result = await db
      .delete(blogArticleProjects)
      .where(and(
        eq(blogArticleProjects.blog_article_id, blogArticleId),
        eq(blogArticleProjects.project_id, projectId)
      ));

    return !!result;
  }

  async updateBlogArticleProjects(blogArticleId: number, projectIds: number[]): Promise<boolean> {
    // Delete existing relationships
    await db
      .delete(blogArticleProjects)
      .where(eq(blogArticleProjects.blog_article_id, blogArticleId));

    // Add new relationships
    if (projectIds.length > 0) {
      await db
        .insert(blogArticleProjects)
        .values(
          projectIds.map(projectId => ({
            blog_article_id: blogArticleId,
            project_id: projectId
          }))
        );
    }

    return true;
  }

  // CMS functionality - Hero Slides
  async getHeroSlide(id: number): Promise<HeroSlide | undefined> {
    const [slide] = await db.select().from(heroSlides).where(eq(heroSlides.id, id));
    return slide || undefined;
  }

  async getAllHeroSlides(): Promise<HeroSlide[]> {
    return db.select().from(heroSlides).orderBy(asc(heroSlides.order_index));
  }

  async createHeroSlide(slide: InsertHeroSlide): Promise<HeroSlide> {
    const [newSlide] = await db
      .insert(heroSlides)
      .values({
        ...slide,
        updated_at: new Date()
      })
      .returning();
    return newSlide;
  }

  async updateHeroSlide(id: number, slide: Partial<InsertHeroSlide>): Promise<HeroSlide | undefined> {
    const [updatedSlide] = await db
      .update(heroSlides)
      .set({
        ...slide,
        updated_at: new Date()
      })
      .where(eq(heroSlides.id, id))
      .returning();
    return updatedSlide;
  }

  async deleteHeroSlide(id: number): Promise<boolean> {
    const result = await db
      .delete(heroSlides)
      .where(eq(heroSlides.id, id));
    return !!result;
  }

  // CMS functionality - About Content
  async getAboutContent(): Promise<AboutContent | undefined> {
    const [content] = await db.select().from(aboutContent);
    return content || undefined;
  }

  async createAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const [newContent] = await db
      .insert(aboutContent)
      .values(content as any)
      .returning();
    return newContent;
  }

  async updateAboutContent(id: number, content: Partial<InsertAboutContent>): Promise<AboutContent | undefined> {
    const [updatedContent] = await db
      .update(aboutContent)
      .set({
        ...content,
        updated_at: new Date()
      } as any)
      .where(eq(aboutContent.id, id))
      .returning();
    return updatedContent;
  }

  // Impact Stats Methods
  async getAllImpactStats(): Promise<ImpactStat[]> {
    return db.select().from(impactStats).orderBy(impactStats.order_index);
  }

  async getImpactStat(id: number): Promise<ImpactStat | undefined> {
    const [stat] = await db.select().from(impactStats).where(eq(impactStats.id, id));
    return stat;
  }

  async createImpactStat(stat: InsertImpactStat): Promise<ImpactStat> {
    const [newStat] = await db.insert(impactStats).values(stat).returning();
    return newStat;
  }

  async updateImpactStat(id: number, stat: Partial<InsertImpactStat>): Promise<ImpactStat | undefined> {
    const [updatedStat] = await db
      .update(impactStats)
      .set(stat)
      .where(eq(impactStats.id, id))
      .returning();
    return updatedStat;
  }

  async deleteImpactStat(id: number): Promise<boolean> {
    const result = await db.delete(impactStats).where(eq(impactStats.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Footer Content methods
  async getFooterContent(): Promise<FooterContent | undefined> {
    const [content] = await db.select().from(footerContent).limit(1);
    return content;
  }

  async createFooterContent(content: InsertFooterContent): Promise<FooterContent> {
    const [result] = await db
      .insert(footerContent)
      .values(content as any)
      .returning();
    return result;
  }

  async updateFooterContent(id: number, content: Partial<InsertFooterContent>): Promise<FooterContent | undefined> {
    try {
      const [result] = await db
        .update(footerContent)
        .set({
          ...content,
          updated_at: new Date(),
        } as any)
        .where(eq(footerContent.id, id))
        .returning();
      return result;
    } catch (error) {
      console.error('Error updating footer content:', error);
      return undefined;
    }
  }

  // Location functionality
  async getLocations(): Promise<Location[]> {
    return db.select().from(locations).orderBy(asc(locations.city));
  }

  async getLocation(id: number): Promise<Location | undefined> {
    const [location] = await db
      .select()
      .from(locations)
      .where(eq(locations.id, id));
    return location || undefined;
  }

  async createLocation(data: InsertLocation): Promise<Location> {
    const [location] = await db
      .insert(locations)
      .values({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning();
    return location;
  }

  async updateLocation(id: number, data: Partial<InsertLocation>): Promise<Location | undefined> {
    const [location] = await db
      .update(locations)
      .set({
        ...data,
        updated_at: new Date()
      })
      .where(eq(locations.id, id))
      .returning();
    return location;
  }

  async deleteLocation(id: number): Promise<boolean> {
    const result = await db
      .delete(locations)
      .where(eq(locations.id, id));
    return !!result;
  }
}

export const storage = new DatabaseStorage();
