import Layout from '../../components/Layout/Layout';
import { Spring, animated } from 'react-spring';
import JobCard from '../../components/JobCard/JobCard';
import { useState } from 'react';
import { useEffect } from 'react';
import * as jobService from '../../utilities/jobs-service'
import optimizeResume from '../../utilities/helpers/optimizeResume';
import resumeConstructor from '../../utilities/helpers/ResumeConstructor';
import {getResume} from '../../utilities/resume-service'

export default function SearchJobs({ user , setUser, getUser, markAsApplied , stopTracking, trackJob, jobsWatched , setResponse}) {
  const [featuredJobs, setFeaturedJobs] = useState(
    localStorage.getItem('featuredJobs')
      ? JSON.parse(localStorage.getItem('featuredJobs'))
      : []
  );
  const [search, setSearch] = useState(
    localStorage.getItem('searchedKeyword')
      ? JSON.parse(localStorage.getItem('searchedKeyword'))
      : ''
  );

  useEffect(() => {
    localStorage.setItem('featuredJobs', JSON.stringify([...featuredJobs]));
    localStorage.setItem('searchedKeyword', JSON.stringify(search));
  }, [featuredJobs, search]);

  async function handleClick(keyWordsArr, name) {
    const userResume = await getResume({ id: user._id });
    console.log('this was returned for the user resume ', userResume);
    resumeConstructor(optimizeResume(keyWordsArr,userResume) , name);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const jobs = await fetch(
      `https://remotive.com/api/remote-jobs?search=${search}&limit=15`
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
        tags:job.tags,
      });
    });
    setFeaturedJobs(jobConverter);
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
                    <div className="input-group relative flex items-stretch w-full mb-4">
                      <form onSubmit={handleSubmit} className="flex flex-row">
                        <input
                          type="search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                        />
                        <button
                          className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                          type="submit"
                          id="button-addon2"
                          onClick={handleSubmit}
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="search"
                            class="w-4"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                            ></path>
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {featuredJobs.length === 0 && (
                  <h1 className="text-4xl font-bold text-center mt-8">
                    No jobs found with that search...
                  </h1>     
                )}
                <div className="jobs-div grid grid-cols-3 grid-rows-auto justify-around gap-y-10 gap-x-8" >
                  {featuredJobs.map((job) => (
                    <JobCard job={job} handleClick={handleClick} jobsWatched={jobsWatched} markAsApplied={markAsApplied} trackJob={trackJob} user={user} isFetched={true}/>
                  ))}
                </div>
              </div>
          </div>
        </animated.div>
      )}
    </Spring>
  );
}
