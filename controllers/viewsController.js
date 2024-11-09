const Tour = require('./../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {
  // 1. get overview
  const tours = await Tour.find();

  res.status(200).render('overview', { title: 'All tours', tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user '
  });

  if (!tour) next(new AppError('there is no tour with the name.', 404));

  res.status(200).render('tour', { title: ` ${tour.name} Tour`, tour });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', { title: 'Log into your account' });
});

exports.getSignupForm = catchAsync(async (req, res) => {
  res.status(200).render('signup', { title: 'Create a new account' });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', { title: 'your account' });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIds = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', { title: 'My Tours', tours });
});

exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    { new: true, runValidators: true }
  );

  res
    .status(200)
    .render('account', { title: 'your account', user: updatedUser });
});
