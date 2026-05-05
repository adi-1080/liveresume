import { prisma } from "../../plugins/db";

export class ResumeService {
    static async getResumeBySlug(username: string, slug: string){
        const user = await prisma.user.findUnique({
            where: {username},
            include: {
                roleProfiles: {where:{slug}}
            }
        });

        if(!user || user.roleProfiles.length === 0) return null;

        return user.roleProfiles[0];
    }

    static async upsertResume(username: string, slug: string, latexContent: string){
        const user = await prisma.user.findUnique({where:{username}});

        if(!user) throw new Error("User not found");

        return await prisma.roleProfile.upsert({
            where: {userId_slug: {userId: user.id, slug: slug}},
            update: {latexContent},
            create: {
                userId: user.id,
                roleName: slug.replace('-',' '),
                slug: slug,
                latexContent: latexContent,
                isPublished: false
            }
        })
    }
}