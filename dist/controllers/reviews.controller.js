"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewController = exports.updateReviewController = exports.createReviewController = exports.getReviewByIdController = exports.getAllReviewsController = void 0;
const ReviewService = __importStar(require("../services/reviews.service"));
const review_validator_1 = __importDefault(require("../validators/review.validator"));
let reviews = [];
const getAllReviewsController = (req, res) => {
    const reviews = ReviewService.getAllReviews();
    const validatedReviews = review_validator_1.default.validateReviewList(reviews);
    if (!validatedReviews) {
        res.status(500).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedReviews);
};
exports.getAllReviewsController = getAllReviewsController;
const getReviewByIdController = (req, res) => {
    const review = ReviewService.getReviewById(req.params.id);
    if (!review) {
        res.status(404).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedReview = review_validator_1.default.validateReview(review);
    if (!validatedReview || validatedReview.id !== req.params.id) {
        res.status(400).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedReview);
};
exports.getReviewByIdController = getReviewByIdController;
const createReviewController = (req, res) => {
    const validatedReview = review_validator_1.default.validateReview(req.body);
    if (!review_validator_1.default.validateReview) {
        res.status(400).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    const newReview = ReviewService.createReview(validatedReview);
    res.status(201).json(newReview);
};
exports.createReviewController = createReviewController;
const updateReviewController = (req, res) => {
    const updatedReview = ReviewService.updateReview(req.params.id, req.body);
    if (!updatedReview) {
        res.status(404).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    const validatedReview = review_validator_1.default.validateReview(updatedReview);
    if (!validatedReview || validatedReview.id !== req.params.id) {
        res.status(400).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(validatedReview);
};
exports.updateReviewController = updateReviewController;
const deleteReviewController = (req, res) => {
    const deletedReview = ReviewService.deleteReview(req.params.id);
    if (!deletedReview) {
        res.status(404).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    const isValid = review_validator_1.default.validateReview(deletedReview);
    if (!isValid || deletedReview.id !== req.params.id) {
        res.status(400).json({ message: review_validator_1.default.getErrors().join('; ') });
        return;
    }
    res.json(deletedReview);
};
exports.deleteReviewController = deleteReviewController;
