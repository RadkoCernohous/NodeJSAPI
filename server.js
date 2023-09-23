const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

process.on("uncaughtException", function(err){
  console.log(`UNCAUGHT EXCEPTION!`);
  console.log(err);
  process.exit(1);
})

const app = require('./app');

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function (con) {
  console.log(`DB Connection successful!`);
})

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", function(err){
  console.log(`UNHANDLED REJECTION!`);
  console.log(err.name, err.message);
  server.close(function(){
    process.exit(1);
  })
})