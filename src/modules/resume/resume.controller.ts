import { ResumeService } from "./resume.service";

export const getResumeHandler = async({params,set}: any) => {
    try{
        const resume = await ResumeService.getResumeBySlug(params.username, params.slug);
        // console.log("resume params", params);
        if(!resume){
            set.status = 404;
            return {success: false, error: "Resume not found"};
        }

        return {success: true, latexContent: resume.latexContent};
    }catch(error){
        set.status = 500;
        return {success: false, error: "Internal server error"};
    }
};

export const upsertResumeHandler = async({body, set}: any) => {
    try{
        await ResumeService.upsertResume(body.username, body.slug, body.latexContent);
        return {success: true, message: "Saved successfully"};
    }catch(error){

    }
}