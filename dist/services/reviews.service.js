"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.getAllReviews = void 0;
const review_schema_1 = require("../schemas/review.schema");
const getAllReviews = async () => {
    const reviews = await review_schema_1.ReviewModel.find();
    return reviews;
};
exports.getAllReviews = getAllReviews;
const getReviewById = async (id) => {
    const review = await review_schema_1.ReviewModel.findOne({ id: id });
    return review;
};
exports.getReviewById = getReviewById;
const createReview = async (newReview) => {
    try {
        const review = new review_schema_1.ReviewModel({
            ...newReview
        });
        await review.save();
        return review;
    }
    catch (error) {
        throw error;
    }
};
exports.createReview = createReview;
const updateReview = async (id, updateReview) => {
    const review = await review_schema_1.ReviewModel.findOneAndUpdate({ _id: id }, updateReview, { new: true });
    return review;
};
exports.updateReview = updateReview;
const deleteReview = async (id) => {
    const deleted = await review_schema_1.ReviewModel.findOneAndDelete({ _id: id });
    if (!deleted) {
        return false;
    }
    return true;
};
exports.deleteReview = deleteReview;
