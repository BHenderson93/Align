const User = require('../../models/M-user');
const AppliedJobs = require('../../models/M-appliedJobs')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken,
  updateUserTags,
  createJWT,
  createNewJWT
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function login(req, res) {
  try {
    //console.log('in controller with reqbody' , req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
  try {
    let token
    User.create({...req.body }).then((user)=>{
      token = createJWT(user);
      AppliedJobs.create([{user:user._id }]).then((aj)=>{
        console.log('new app jobs for user, ' ,aj)
        res.json(token);
      })
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

function createNewJWT(id) {
  User.findOne({_id:id}).then((user)=>{
    console.log('new jwt created after resume')
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }).catch((err)=>{
    console.log('error creating new jwt' , err)
  })
}

function updateUserTags(req,res){
  console.log('in users controller to update user tags with ' , req.body)
  User.updateOne({_id:req.body.id} , {$set:{tags:req.body.userTags}}).then((change)=>{
    console.log('changed tags to ' , change)
    res.send(200)
  }).catch((err)=>{
    console.log('got an error updating tags' ,err)
    res.send(500)
  }) 
}