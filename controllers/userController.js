const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync=require('./../utils/catchAsynch');
const factory = require("./handlerFactory")

const filterObj=function(obj, ...allowedfields){
  const newObject={}
  Object.keys(obj).forEach(function(el){
    if(allowedfields.includes(el)){
      newObject[el]=obj[el]
    }
  })
  return newObject
}

exports.getMe=function(req,res,next){
  req.params.id=req.user.id;
  next();
}

exports.updateMe=catchAsync(async function(req,res,next){
  if(req.body.password || req.body.passwordConfirm){
    return next(new AppError("This route is not for password updates. Please use updateMyPassword",400))
  }

  const filteredBody=filterObj(req.body, 'name','email')
  const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody, {
    new: true,
    runValidators:true
  })

  res.status(200).json({
    status:"success ",
    data:{
      user: updatedUser
    }
  })
})

exports.deleteMe=catchAsync(async function(req,res,next){
  await User.findByIdAndUpdate(req.user.id,{active:false});

  res.status(204).json({
    status:"success ",
    data:null
  })
})

exports.getAllUsers=factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser=factory.deleteOne(User);
/*exports.deleteUser = function (req, res) {
  res.status(500).json({
    status: "error1",
    message: "this route is not yet defined!"
  })
}*/