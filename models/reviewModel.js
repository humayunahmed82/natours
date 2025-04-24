import mongoose from "mongoose";
import Tour from "./tourModel.js";

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a Tour"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a User"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// user can only review a tour once
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: "tour",
  //     select: "name",
  //   }).populate({
  //     path: "user",
  //     select: "name photo role",
  //   });

  this.populate({
    path: "user",
    select: "name photo role",
  });

  next();
});

reviewSchema.statics.calcAverages = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await this.model("Tour").findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await this.model("Tour").findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  // this points to the current review
  this.model("Review")
    .calcAverages(this.tour)
    .catch((err) => {
      console.error("Error calculating averages after save:", err);
    });
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.r) {
    try {
      await this.r.model("Review").calcAverages(this.r.tour);
    } catch (err) {
      console.error("Error calculating averages after findOneAnd:", err);
    }
  }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
