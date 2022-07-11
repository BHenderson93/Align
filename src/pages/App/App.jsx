import React, { useState, useEffect } from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LoginPage from '../LoginPage/LoginPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import ConstructionPage from '../ConstructionPage/ConstructionPage';
import FeaturedJobs from '../FeaturedJobs/FeaturedJobs';
import ProfilePage from '../ProfilePage/ProfilePage';
import Layout from '../../components/Layout/Layout';
import SearchJobs from '../SearchJobs/SearchJobs'
import {
  getAppliedJobs,
  markJobAsApplied,
  stopTrackingJob,
} from '../../utilities/jobs-service';
import * as jobService from '../../utilities/jobs-service';
import { useInsertionEffect } from 'react';

export default function App() {
  const [user, setUser] = useState(getUser());

  const [jobsWatched, setJobsWatched] = useState({
    tracked: [],
    applied: [],
  });

  const [response, setResponse] = useState({});

  const markAsApplied = async (job_id, user_id) => {
    const jobsApplied =  await jobService.markJobAsApplied(job_id, user_id);
    setResponse(jobsApplied);
  };

  async function trackJob(jobDetails, userId, applied) {
    console.log('attempting to track job')
    const trackedJob = await jobService.trackJob(jobDetails, userId, applied)
    setResponse(trackedJob)
  }

  const stopTracking = async (job_id, user_id) => {
    const jobToStopTracking = await jobService.stopTrackingJob(job_id, user_id);
    setResponse(jobToStopTracking);
  };

  useEffect(() => {
    if(user) {(async function populateJobs() {
      const jobsWatched = await getAppliedJobs({ id: user._id });

      if (jobsWatched) {
        const tracked = jobsWatched.appliedJobList.filter(
          (job) => !job.date_applied
        );
        const applied = jobsWatched.appliedJobList.filter(
          (job) => job.date_applied
        );
        setJobsWatched({ tracked: tracked, applied: applied });
      }
      console.log('my applied jobs are ', jobsWatched);
    })()}
  }, [response]);


  return (
    <main className="App">
      {user ? (
        <Layout active={true} setUser={setUser} user={user}>
        <Routes>
          <Route
            path="/construction"
            element={<ConstructionPage user={user} setUser={setUser} exact />}
          />
          <Route
            path="/featured-jobs"
            element={<FeaturedJobs user={user} setUser={setUser} getUser={getUser} markAsApplied={markAsApplied} stopTracking={stopTracking} trackJob={trackJob}  jobsWatched={jobsWatched} setResponse={setResponse} exact />}
          />
                    <Route
            path="/search-jobs"
            element={<SearchJobs user={user} setUser={setUser} getUser={getUser} markAsApplied={markAsApplied} stopTracking={stopTracking} trackJob={trackJob}  jobsWatched={jobsWatched} setResponse={setResponse} exact />}
          />
          <Route
            path="/profile"
            element={<ProfilePage getAppliedJobs={getAppliedJobs} setJobsWatched={setJobsWatched} user={user} setUser={setUser} getUser={getUser} markAsApplied={markAsApplied} stopTracking={stopTracking} trackJob={trackJob}  jobsWatched={jobsWatched} setResponse={setResponse} />}
          />
          <Route path="/*" element={<Navigate to='/profile'/>} exact />
        </Routes>
        </Layout>
      ) : (
        <Layout active={false} setUser={setUser}>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route
            path="/signup"
            element={<SignUpPage user={user} setUser={setUser} />}
            exact
          />
          <Route
            path="/login"
            element={<LoginPage user={user} setUser={setUser} />}
            exact
          />
          <Route path="/*" element={<Navigate to='/'/>} exact />
        </Routes>
        </Layout>
      )}
    </main>
  );
}
