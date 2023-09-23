const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');
dotenv.config({ path: './config.env' })


const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(function (con) {
  console.log(`DB Connection successful!`);
})



const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));


const importData = async function () {
  try {
    await Tour.deleteMany({})
    await User.deleteMany({})
    await Review.deleteMany({})
    let tours2=await Tour.create(tours);
    let users2=await User.create(users,{validateBeforeSave:false});
    let reviews2=await Review.create(reviews);
    console.log("Data succesfully loaded")
  }
  catch (err) {
    console.log(err)
  }
}

const deleteData = async function () {
  try {
    await Tour.deleteMany()
    console.log(`Data deleted`);
  }
  catch {
    console.log(err);
  }
}

importData();