import { ResumeService } from "./resume.service";

export const getDashboardHandler = async ({ user, set }: any) => {
  if (!user) {
    set.status = 401;
    return { success: false, error: "Unauthorized" };
  }

  const resumes = await ResumeService.getUserResumes(user.sub);
  return { success: true, resumes };
};

export const getEditorHandler = async ({ user, params, set }: any) => {
  if (!user) {
    set.status = 401;
    return { success: false, error: "Unauthorized" };
  }

  const resume = await ResumeService.getResumeForEditor(user.sub, params.slug);
  if (!resume) {
    set.status = 404;
    return { success: false, error: "Resume not found" };
  }
  return { success: true, resume };
};

export const saveDraftHandler = async ({ user, body, set }: any) => {
  if (!user) {
    set.status = 401;
    return { success: false, error: "Unauthorized" };
  }

  const resume = await ResumeService.saveDraft(user.sub, body.slug, body.roleName, body.draftContent);
  return { success: true, message: "Draft saved!", resume };
};

export const publishHandler = async ({ user, params, set }: any) => {
  if (!user) {
    set.status = 401;
    return { success: false, error: "Unauthorized" };
  }

  const resume = await ResumeService.publishResume(user.sub, params.slug);
  return { success: true, message: "Resume published to live URL!", resume };
};

export const unpublishHandler = async ({ user, params, set }: any) => {
  if (!user) {
    set.status = 401;
    return { success: false, error: "Unauthorized" };
  }

  const resume = await ResumeService.unpublishResume(user.sub, params.slug);
  return { success: true, message: "Live link deactivated.", resume };
};

export const getPublicResumeHandler = async ({ params, set }: any) => {
  try {
    const publishedContent = await ResumeService.getPublicResume(params.username, params.slug);
    return { success: true, latexContent: publishedContent };
  } catch (error: any) {
    set.status = 404;
    return { success: false, error: error.message };
  }
};