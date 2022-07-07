import sendRequest from './send-request';

const BASE_URL = '/api/resume';

export function createResume(resume) {
  return sendRequest(`${BASE_URL}/`, 'POST', resume);
}

export function getResume(id){
  console.log('r-api fetching resume for id ' , id)
  return sendRequest(`${BASE_URL}/get-resume` , 'POST' , id)
}