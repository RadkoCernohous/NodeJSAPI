const express = require('express')
const reviewController = require('./../controllers/reviewController')
const authController=require('./../controllers/authController.js')
const router = express.Router({mergeParams:true});

router.use(authController.protect)

router.route("/").get(reviewController.getAllreview).post(authController.restrictTo("user"),reviewController.setTourUserIds,reviewController.createReview)
router.route("/:id").delete(authController.restrictTo("user","admin"),reviewController.deleteReview).patch(authController.restrictTo("user","admin"),reviewController.updateReview).get(reviewController.getReview)

module.exports=router