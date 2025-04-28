"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class ReviewValidator {
    static validateReview(review) {
        this.errors = [];
        if (!review || typeof review !== 'object') {
            this.errors.push("Invalid object review");
        }
        if ('id' in review && typeof review.id !== 'string') {
            this.errors.push("Invalid review id");
        }
        if ('date' in review && !(new Date(review.date) instanceof Date)) {
            this.errors.push("Invalid review date");
        }
        if ('customer_name' in review && typeof review.customer_name !== 'string') {
            this.errors.push("Invalid review customer name");
        }
        if ('customer_id' in review && typeof review.customer_id !== 'string') {
            this.errors.push("Invalid review customer id");
        }
        if ('phone' in review && typeof review.phone !== 'string') {
            this.errors.push("Invalid review phone");
        }
        if ('subject' in review && typeof review.subject !== 'string') {
            this.errors.push("Invalid review subject");
        }
        if ('comment' in review && typeof review.comment !== 'string') {
            this.errors.push("Invalid review comment");
        }
        if ('archived' in review && typeof review.archived !== 'boolean') {
            this.errors.push("Invalid review archived");
        }
        return this.errors.length === 0 ? review : false;
    }
}
_a = ReviewValidator;
ReviewValidator.errors = [];
ReviewValidator.validateReviewList = (data) => {
    if (!Array.isArray(data)) {
        _a.errors.push("Invalid review list");
        return false;
    }
    const validatedReviews = [];
    for (const item of data) {
        const validReview = _a.validateReview(item);
        if (!validReview)
            continue;
        validatedReviews.push(validReview);
    }
    return validatedReviews.length === 0 ? false : validatedReviews;
};
ReviewValidator.getErrors = () => {
    return _a.errors;
};
exports.default = ReviewValidator;
