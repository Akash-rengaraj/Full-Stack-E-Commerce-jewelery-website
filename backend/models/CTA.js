const mongoose = require('mongoose');

const ctaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Done'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CTA', ctaSchema);
