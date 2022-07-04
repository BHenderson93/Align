// ! Modules
import { Spring, animated } from 'react-spring';

// ! Components
import ResumeViewer from '../../components/ResumeViewer/ResumeViewer';
import SectionInput from '../../components/SectionInput/SectionInput';
import Stepper from '../../components/Stepper.jsx/Stepper';
import Layout from '../../components/Layout/Layout';
import StepperNav from '../../components/StepperNav/StepperNav';
import { useState } from 'react';

export default function ConstructionPage({ user }) {
  const [step, setStep] = useState(0);
  const steps = ['Objective', 'Skills', 'Experience', 'Education'];
  const [currentSection, setCurrentSection] = useState(steps[step]);
  const [sections, setSections] = useState({
    Objective: true,
    Skills: false,
    Experience: false,
    Education: false,
  });

  return (
    <Layout active={'construction'} user={user}>
      <Spring
        from={{ opacity: 0, marginTop: -500 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <animated.div style={props}>
            <div className="bg-gray-200 h-screen">
              <div>
                <Stepper
                  step={step}
                  steps={steps}
                  section={currentSection}
                  setSections={setSections}
                  sections={sections}
                />
              </div>
              <div className="flex items-center justify-center gap-x-96 mt-24">
                <SectionInput section={currentSection} />
                <ResumeViewer section={currentSection}/>
              </div>
              <StepperNav
                step={step}
                setStep={setStep}
                setCurrentSection={setCurrentSection}
                steps={steps}
                currentSection={currentSection}
                setSections={setSections}
                sections={sections}
              />
            </div>
          </animated.div>
        )}
      </Spring>
    </Layout>
  );
}
