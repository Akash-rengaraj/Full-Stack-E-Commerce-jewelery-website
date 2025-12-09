const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    }
}, {
    timestamps: true,
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
