const { Schema, model } = require('../connection');

const BusinessSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String},
    country: { type: String},
    businessName: { type: String },
    businessType: { type: String,  },
    businessRegNo:{type: String, },
    businessPlan:{type: String, },
    website:{type: String},
    linkedin:{type: String},
    annualRevenue:{type: String},
    expansionCountry:{type: String},
    investmentBudget:{type: String},
});

module.exports = model('Business', BusinessSchema);