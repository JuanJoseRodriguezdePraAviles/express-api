"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.getAllReviews = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const reviewsFilePath = path_1.default.join(__dirname, '../../public/Reviews.json');
const readReviewsFromFile = () => {
    const fileData = fs_1.default.readFileSync(reviewsFilePath, 'utf-8');
    return JSON.parse(fileData);
};
const getAllReviews = () => {
    return readReviewsFromFile();
};
exports.getAllReviews = getAllReviews;
const getReviewById = (id) => {
    const reviews = readReviewsFromFile();
    return reviews.find(review => String(review.id) === id);
};
exports.getReviewById = getReviewById;
const createReview = (newReview) => {
    const reviews = readReviewsFromFile();
    newReview.id = Date.now().toString();
    reviews.push(newReview);
    fs_1.default.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
    return newReview;
};
exports.createReview = createReview;
const updateReview = (id, updateReview) => {
    const reviews = readReviewsFromFile();
    const index = reviews.findIndex(review => String(review.id) === id);
    if (index !== -1) {
        reviews[index] = { ...reviews[index], ...updateReview };
        fs_1.default.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
        return reviews[index];
    }
    return undefined;
};
exports.updateReview = updateReview;
const deleteReview = (id) => {
    const reviews = readReviewsFromFile();
    const index = reviews.findIndex(review => String(review.id) === id);
    if (index !== -1) {
        const deletedReview = reviews.splice(index, 1);
        fs_1.default.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
        return deletedReview[0];
    }
    return undefined;
};
exports.deleteReview = deleteReview;
