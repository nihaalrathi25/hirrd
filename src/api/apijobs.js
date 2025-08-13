import supabaseClient from "@/utils/supabase";
// import { e } from "@clerk/clerk-react/dist/useAuth-QDObRHrL";

export async function getjobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
  .from("jobs")
  .select(`
    *,
    company:companies(name,logo_url),
    saved:saved_jobs!saved_jobs_job_id_fkey(id)
  `);

  if (location) {
    query = query.eq("location", location); // ✅ fix
  }

  if (company_id) {
    query = query.eq("company_id", company_id); // ✅ added filter
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`); // ✅ fix
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching jobs:", error.message);
    return [];
  }

  return data;
}







export async function saveJob(token, { alreadySaved},saveData) {
  const supabase = await supabaseClient(token);
  
if(alreadySaved){
  const { data, error:deleteError } = await supabase
  .from("saved_jobs")
  .delete()
  .eq("job_id",saveData.job_id);

  if (deleteError) {
    console.error("Error deleting Saved job:", deleteError);
    return null;
  }

  return data;
}else{
  const { data, error:insertError } = await supabase
  .from("saved_jobs")
  .insert([saveData])
  .select()

   if (insertError) {
    console.error("Error fetching job:", error.insertError);
    return null;
  }

  return data;
}

  const { data, error } = await supabase
  .from("jobs")
  .select(`
    *,
    company:companies(name,logo_url),
    saved:saved_jobs!saved_jobs_job_id_fkey(id)
  `);
  if (error) {
    console.error("Error fetching jobs:", error.message);
    return [];
  }

  return data;
}

export async function getSingleJob(token,{job_id}) {
  const supabase=await supabaseClient(token);

  const { data, error } = await supabase
  .from("jobs")
  .select(
    "*, company:companies(name,logo_url), applications:applications!applications_job_id_fkey(*)"
  )
  .eq("id", job_id)
  .single();


  if(error){
    console.error("Error updating job:",error)
    return null;
  }
  return data;
}
///////////////////////////////////////
export async function updateHiringStatus(token,{job_id},isOpen) {
  const supabase=await supabaseClient(token);

  const { data, error } = await supabase
  .from("jobs")
  .update({isOpen})
  .eq("id", job_id)
  .select()


  if(error){
    console.error("Error fetching:",error)
    return null;
  }
  return data;
}
//////////////////////////
export async function addNewJob(token,_,jobData) {
  const supabase=await supabaseClient(token);

  const { data, error } = await supabase
  .from("jobs")
  .insert([jobData])
  .select();
  

  if(error){
    console.error("Error Creating a Job:",error)
    return null;
  }
  return data;
}

/////////////////////
export async function getSavedJobs(token) {
  const supabase=await supabaseClient(token);

  const { data, error } = await supabase
  .from("saved_jobs")
  .select("*,job:jobs(*,company:companies(name,logo_url))");
  

  if(error){
    console.error("Error Fetching saved Jobs:",error)
    return null;
  }
  return data;
}
////////////////
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

////////////
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}
export const deleteSavedJob = async (token, { user_id, job_id }) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("user_id", user_id)
    .eq("job_id", job_id);

  if (error) {
    console.error("Error deleting saved job:", error);
    return null;
  }
  return data;
};
