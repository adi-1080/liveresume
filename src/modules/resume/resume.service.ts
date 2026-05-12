import { prisma } from "../../plugins/db";

export class ResumeService {
  
  static async getUserResumes(userId: string) {
    return await prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });
  }

  static async getResumeForEditor(userId: string, slug: string) {
    return await prisma.resume.findUnique({
      where: { userId_slug: { userId, slug } }
    });
  }

  static async saveDraft(userId: string, slug: string, roleName: string, draftContent: string) {
    return await prisma.resume.upsert({
      where: { userId_slug: { userId, slug } },
      update: { draftContent, roleName },
      create: { userId, slug, roleName, draftContent }
    });
  }

  static async publishResume(userId: string, slug: string) {
    const resume = await prisma.resume.findUnique({
      where: { userId_slug: { userId, slug } }
    });

    if (!resume) throw new Error("Resume not found");

    return await prisma.resume.update({
      where: { id: resume.id },
      data: { 
        publishedContent: resume.draftContent, 
        isPublished: true 
      }
    });
  }

  static async unpublishResume(userId: string, slug: string) {
    return await prisma.resume.update({
      where: { userId_slug: { userId, slug } },
      data: { isPublished: false }
    });
  }

  static async getPublicResume(username: string, slug: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error("User not found");

    const resume = await prisma.resume.findUnique({
      where: { userId_slug: { userId: user.id, slug } }
    });

    if (!resume || !resume.isPublished) {
      throw new Error("Resume not found or not published");
    }

    return resume.publishedContent;
  }
}