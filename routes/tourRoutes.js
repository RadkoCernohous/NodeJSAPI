const express = require('express')
const tourController = require('./../controllers/tourController.js')
const authController=require('./../controllers/authController.js')
const reviewRouter=require('./../routes/reviewRoutes.js')
const router = express.Router();

//router.route('/:tourId/reviews').post(authController.protect, authController.restrictTo("user"), reviewController.createReview)
router.use("/:tourId/reviews", reviewRouter)

router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(tourController.getToursWithin)
router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances)

//router.param('id', tourController.checkID)
router.route("/test").patch(tourController.test)
router.route("/top-5-cheap").get(tourController.aliasTopTours, tourController.getAllTours)
router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(authController.protect, authController.restrictTo("admin", "lead-guide","guide"),tourController.getMonthlyPlan);
router.route('/').get(tourController.getAllTours).post(authController.protect, authController.restrictTo("admin", "lead-guide"),tourController.createTour)
router.route('/:id').get(tourController.getOneTour).patch(authController.protect, authController.restrictTo("admin", "lead-guide"),tourController.UpdateTour).delete(authController.protect, authController.restrictTo("admin", "lead-guide"),tourController.deleteTour)

module.exports = router;