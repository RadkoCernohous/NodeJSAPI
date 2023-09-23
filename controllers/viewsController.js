const Tour=require("../models/tourModel")
const catchAsync=require("../utils/catchAsynch")

exports.getOverview=catchAsync( async function(req, res, next){
  const tours=await Tour.find();  
  
  
  res.status(200).render('overview',{
      title: "All tours",
      tours
    })
  })

exports.getTour=catchAsync( async function(req, res){
  const tour=await Tour.findOne({slug: req.params.slug}).populate({
    path: "reviews",
    select:"review rating user"
  })
    res.status(200).render('tour',{
      title: `${tour.name} Tour`,
      tour
    })
  }
)

exports.getLoginForm=function(req,res,next){
  res.status(200).render('login',{
    title: "Log into your account"
  })
}