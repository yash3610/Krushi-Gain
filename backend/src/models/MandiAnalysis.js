const mongoose = require('mongoose');

const mandiAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crop: {
      type: String,
      required: true,
      trim: true,
    },
    currentMandi: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    transportCost: {
      type: Number,
      required: true,
      min: 0,
    },
    recommendedMandi: {
      type: String,
      required: true,
      trim: true,
    },
    profit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

module.exports = mongoose.model('MandiAnalysis', mandiAnalysisSchema);
