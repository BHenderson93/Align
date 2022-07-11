import { v4 as uuidv4 } from 'uuid';
import SkillsView from '../../Review/SkillsView/SkillsView';
import { Spring, animated } from 'react-spring';
import { useState, useEffect } from 'react';
import Modal from '../../Modal/Modal';

export default function PersonalInfoSection({
  section,
  skills,
  setSkills,
  skill,
  setSkill,
  register,
  handleSubmit,
  setValue,
  errors,
  lineTagger,
  userTags, 
  setUserTags,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const resetFields = () => {
    setValue('skill', '');
  };

  const handleChange = (e) => {
    setSkill((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (data, e) => {
    console.log(data);
    const tags = lineTagger(data.skill)
    let newTags = {...userTags}
    tags.forEach((tag)=>{
      newTags[tag]? newTags[tag]++ : newTags[tag]=1
    })
    setUserTags(newTags)
    if (Object.keys(errors).length === 0) {
      e.preventDefault();
      setSkills((prevSkills) => [
        ...prevSkills,
        {
          _id: uuidv4(),
          skill: skill.skill,
          priority: parseInt(skill.priority),
          tags: tags,
        },
      ]);
      setSkill({ _id: '', skill: '', priority: 0 , tags:[]});
      setModalIsOpen(true);
      resetFields();
      setTimeout(() => setModalIsOpen(false), 1000);
    }
  };

  const submitHandler = (e) => {
    // e.preventDefault();
    // setSkills((prevSkills) => [
    //   ...prevSkills,
    //   {
    //     _id: uuidv4(),
    //     skill: skill.skill,
    //     priority: parseInt(skill.priority),
    //   },
    // ]);
    // setSkill({ _id: '', skill: '', priority: 0 });
  };
  return (
    <Spring
      from={{ opacity: 0, marginLeft: -1000 }}
      to={{ opacity: 1, marginLeft: 0 }}
    >
      {(props) => (
        <animated.div style={props}>
          <div className="flex gap-x-60">
            <div className="h-auto w-96 min-h-full bg-gray-200 p-8 border border-2 border-gray-300 drop-shadow-2xl rounded">
              <ul className="w-full text-sm font-medium text-gray-900 border border-gray-200 rounded-lg dark:bg-gray-300 dark:border-gray-400 dark:text-black">
                <li className="w-full px-4 py-2 rounded-t-lg dark:border-gray-600 text-center font-bold">
                  {section === 'PersonalInfo'
                    ? 'Personal Info'.toUpperCase()
                    : section}
                </li>
              </ul>

              <div className="w-96">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="my-2 mt-8">
                    <input
                      className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="skill"
                      type="text"
                      name="skill"
                      // value={skill.skill}
                      // onChange={handleChange}
                      {...register('skill', {
                        value: skill.skill,
                        onChange: handleChange,
                        required: 'Skill is required!',
                        minLength: 3,
                        maxLengthL: 20,
                      })}
                      placeholder="Enter Skill"
                    />
                    {errors?.skill?.type === 'required' && (
                      <p className="text-white bg-red-500 w-10/12 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                        This field is required
                      </p>
                    )}
                    {errors?.skill?.type === 'minLength' && (
                      <p className="text-white bg-red-500 w-10/12 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                        Must have atleast 3 characters
                      </p>
                    )}
                    {errors?.skill?.type === 'maxLength' && (
                      <p className="text-white bg-red-500 w-10/12 text-center mt-1 rounded font-bold px-2 py-1 text-sm">
                        Cannot exceed 20 characters
                      </p>
                    )}
                  </div>
                  <div className="inline-block relative w-48 mr-2 mt-2">
                    <select
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-500"
                      name="priority"
                      value={skill.priority}
                      onChange={handleChange}
                    >
                      <option value={0}>Normal</option>
                      <option value={1}>High Priority</option>
                      <option value={2}>Essential</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 shadow-lg shadow-blue-500/50"
                    type="submit"
                  >
                    Add Skill
                  </button>
                </form>
              </div>
            </div>
            <SkillsView
              section={section}
              skills={skills}
              setSkills={setSkills}
            />
          </div>
          {modalIsOpen && (
            <Modal isShow={modalIsOpen} closeModal={setModalIsOpen} />
          )}
        </animated.div>
      )}
    </Spring>
  );
}
