const Resume = require('../../models/M-resume');
const User = require('../../models/M-user')
const UserCtrl = require('./C-users')

const addNewResume = async (req, res) => {
  req.body.skills = req.body.skills.map((skill) => {
    skill = { skill: skill.skill, priority: skill.priority , tags:skill.tags };
    return skill;
  });
  console.log('resume controller skills',req.body.skills);
  Resume.deleteOne({ user: req.body.user }).then((del) => {
    console.log('deleted ', del);
    Resume.create(req.body)
      .then(async (response) => {
        const token = await UserCtrl.createJWT(req.body.user)
        console.log('returning JWT after resume submit' , token)
        //console.log('neewwResume', newResume);
        res.json(token);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500)
      });
  });
};

const getResume = async (req, res) => {
  console.log('finding resume for id , ', req.body.id);
  Resume.findOne({ user: req.body.id })
    .then((doc) => {
      console.log('returned the users resume from c-res as ,', doc);
      res.json(doc);
    })
    .catch((err) => {
      console.log('Error retreiving user resume from c-resume', err);
    });
};

module.exports = {
  addNewResume,
  getResume,
};
