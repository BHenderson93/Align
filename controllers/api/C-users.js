const User = require('../../models/M-user');
const AppliedJobs = require('../../models/M-appliedJobs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function login(req, res) {
  console.log(req.body);
  try {
    //console.log('in controller with reqbody' , req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
  try {
    let token;
    User.create({ ...req.body }).then((user) => {
      token = createJWT(user);
      AppliedJobs.create([{ user: user._id }]).then((aj) => {
        console.log('new app jobs for user, ', aj);
        res.json(token);
      });
    });
  } catch (e) {
    res.status(400).json(e);
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

async function createNewJWT(id) {
  // User.findOne({ _id: id })
  //   .then((user) => {
  //     console.log('new jwt created after resume', user);
  //     let test = jwt.sign(
  //       // data payload
  //       { user },
  //       process.env.SECRET,
  //       { expiresIn: '24h' }
  //     );
  //     console.log('zzzz', test);

  //     return test;
  //   })
  //   .catch((err) => {
  //     console.log('error creating new jwt', err);
  //   });

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      console.log('new jwt created after resume', user);
      let token = jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
      );
      console.log('TOKEEYN', token);
      if (token) {
        return token;
      }
    }
  } catch (error) {}
}

const getUser = async(req, res) => {
  console.log('HOOO', req.params)
  try {
    const user = User.findOne({ _id: req.params.id });
    if (user) {
      res.sendStatus(200).json(user);
    }
  } catch (error) {
    res.sendStatus(500).json({ Message: error });
  }
};

function updateUserTags(req, res) {
  console.log('in users controller to update user tags with ', req.body);
  User.updateOne({ _id: req.body.id }, { $set: { tags: req.body.userTags } })
    .then((change) => {
      console.log('changed tags to ', change);
      res.send(200);
    })
    .catch((err) => {
      console.log('got an error updating tags', err);
      res.send(500);
    });
}


module.exports = {
  create,
  login,
  checkToken,
  updateUserTags,
  createNewJWT,
  getUser,
};