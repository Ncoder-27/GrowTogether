const { Schema, model } = require('../connection');
const PartnerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    businessName: { type: String, required: true },
    businessType: { type: String, required: true }, 
    industry: { type: String, required: true },
    businessRegNo: { type: String, required: true },
    website: { type: String},
    linkedin: { type: String},
    experienceYears: { type: String, required: true },
    investmentCapacity: { type: String, required: true },
    availability: { type: String, required: true },
    helpDescription: { type: String, required: true },

})
module.exports = model('Partner', PartnerSchema);