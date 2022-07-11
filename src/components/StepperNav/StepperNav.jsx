/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createResume } from '../../utilities/resume-service';
import { updateUserTags } from '../../utilities/users-service'
export default function StepperNav({
  user,
  step,
  setStep,
  currentSection,
  setCurrentSection,
  steps,
  sections,
  setSections,
  resume,
  errors,
  userTags,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentSection(steps[step]);
    // console.log(steps[step]);
  }, [step, currentSection]);

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  async function handleComplete() {
    resume.user = user._id;
    const resDone = await createResume(resume)
    if (resDone) {
      updateUserTags(userTags, user._id)
      navigate('/profile', { replace: true })
    }
  }

  return (
    <div className="mx-8 mt-16">
      <div className="flex p-2 justify-between">
        <div>
          <button
            className={`text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out shadow-white-500/50 border-white
        border-gray-600 transition ${step === 0 && 'cursor-not-allowed'}`}
            onClick={() => {
              setStep((prevStep) => prevStep - 1);
              setSections((prevSections) => ({
                ...prevSections,
                [`${steps[step]}`]: false,
              }));
            }}
            disabled={step === 0}
          >
            Previous
          </button>
        </div>
        {/* <div className="flex items-center">
          <h1 className="text-gray-100 font-semibold text-xl">
            Step {step + 1}/{steps.length} -{' '}
            {steps[step] === 'PersonalInfo' ? 'Personal Info' : steps[step]}
          </h1>
        </div> */}
        <div className="flex">
          {step === steps.length - 1 ? (
            <button
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mb-2 bg-blue-500 shadow-lg shadow-blue-500/50 transition duration-200 ease-in-out hover:scale-110 px-8"
              onClick={handleComplete}
            >
              Submit
            </button>
          ) : (
            <button
              className={`text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
              ${Object.keys(errors).length === 0 ? 'bg-cyan-500' : ' bg-black'} 
              text-white 
              border duration-200 ease-in-out 
              border-cyan-500 transition shadow-lg shadow-cyan-500/50 px-8`}
              onClick={() => {
                setStep((prevStep) => prevStep + 1);
                setSections((prevSections) => ({
                  ...prevSections,
                  [`${steps[step + 1]}`]: true,
                }));
              }}
              disabled={Object.keys(errors).length > 0}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
