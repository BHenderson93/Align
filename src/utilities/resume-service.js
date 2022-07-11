import * as resumeAPI from './resume-api';

export async function createResume(resume) {
  try{
    const token = await resumeAPI.createResume(resume);
    localStorage.setItem('token', token);
    console.log('updated token to' , token)
    return true
  }catch(err){
    console.log('err creating resume' , err)
    return false
  }

}

export async function getResume(id){
  return resumeAPI.getResume(id)
}