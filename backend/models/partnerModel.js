const { Schema, model } = require('../connection');
const PartnerSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String},
    country: { type: String },
    businessName: { type: String },
    businessType: { type: String }, 
    industry: { type: String},
    businessRegNo: { type: String},
    website: { type: String},
    linkedin: { type: String},
    experienceYears: { type: String},
    investmentCapacity: { type: String },
    availability: { type: String },
    helpDescription: { type: String },

})
module.exports = model('Partner', PartnerSchema);