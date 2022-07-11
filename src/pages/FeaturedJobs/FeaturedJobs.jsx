/* eslint-disable react-hooks/exhaustive-deps */
import Layout from '../../components/Layout/Layout';
import { Spring, animated } from 'react-spring';
import JobCard from '../../components/JobCard/JobCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import { updateUserTags } from '../../utilities/users-service';
import optimizeResume from '../../utilities/helpers/optimizeResume';
import resumeConstructor from '../../utilities/helpers/ResumeConstructor';
import {getResume} from '../../utilities/resume-service'


export default function FeaturedJobs({
  user,
  setUser,
  getUser,
  markAsApplied,
  stopTracking,
  trackJob,
  jobsWatched,
  setResponse,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [featuredJobs, setFeaturedJobs] = useState(
    localStorage.getItem('featuredJobs')
      ? JSON.parse(localStorage.getItem('featuredJobs'))
      : []
  );

  useEffect(async () => {
    let search = '';
    try {
      const fetchedUser = await getUser(user._id);
      if (fetchedUser) {
        console.log(fetchedUser)
        console.log('my user tags are', fetchedUser.tags);
        if (fetchedUser?.tags) {
          if (Object.keys(fetchedUser?.tags).length > 2) {
            search = Object.keys(fetchedUser?.tags)
              .map((tag) => [tag, fetchedUser?.tags[tag]])
              .sort(function (a, b) {
                return b[1] - a[1];
              })
              .slice(0, 3);
          } else {
            search = Object.keys(fetchedUser.tags)
              .map((tag) => [tag, fetchedUser.tags[tag]])
              .sort(function (a, b) {
                return b[1] - a[1];
              });
          }
          search = search.map((item) => item[0]).join(',');
          console.log('searching for... ', search);
          const jobs = await fetch(
            `https://remotive.com/api/remote-jobs?search=${search}&limit=6`
          );

          const response = await jobs.json();

      const jobConverter = [];
      response.jobs.forEach((job) => {
        jobConverter.push({
          position: job.title,
          company: job.company_name,
          logoUrl: job.company_logo,
          location: job.candidate_required_location,
          jobType: job.job_type,
          job_link: job.url,
          resume_link: null,
          job_date_posted: job.publication_date,
          date_applied: null,
          tags:job.tags
        });
      });
      setFeaturedJobs(jobConverter);
    }
  }, [])

  async function handleClick(keyWordsArr , name) {
    const userResume = await getResume({ id: user._id });
    console.log('this was returned for the user resume ', userResume);
    resumeConstructor(optimizeResume(keyWordsArr,userResume), name);
  }

  return (
    <Spring
      from={{ opacity: 0, marginLeft: -1000 }}
      to={{ opacity: 1, marginLeft: 0 }}
    >
      {(props) => (
        <animated.div style={props}>
          <div>
            <div className="p-16 flex-col w-full justify-center items-center">
              <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                  <div className="input-group relative flex items-stretch w-full mb-4"></div>
                </div>
              </div>
              {featuredJobs.length > 0 && (
                <h1 className="text-4xl font-bold text-center mt-8">
                  Featured Jobs
                </h1>
              )}
              <div className="jobs-div grid grid-cols-3 grid-rows-auto justify-around gap-y-10 gap-x-8">
                {featuredJobs.map((job) => (
                  <JobCard job={job} jobsWatched={jobsWatched} handleClick={handleClick} markAsApplied={markAsApplied} trackJob={trackJob} user={user} isFetched={true} />
                ))}
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </Spring>
  );
}
