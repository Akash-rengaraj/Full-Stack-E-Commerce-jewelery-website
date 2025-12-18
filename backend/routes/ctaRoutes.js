const express = require('express');
const router = express.Router();
const CTA = require('../models/CTA');

// @desc    Get all CTAs
// @route   GET /api/cta
// @access  Private/Admin
router.get('/', async (req, res) => {
    try {
        const ctas = await CTA.find({}).sort({ createdAt: -1 });
        res.json(ctas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a CTA
// @route   POST /api/cta
// @access  Public
router.post('/', async (req, res) => {
    const { name, phone, message } = req.body;

    try {
        const cta = await CTA.create({
            name,
            phone,
            message
        });
        res.status(201).json(cta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update CTA status
// @route   PUT /api/cta/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
    try {
        const cta = await CTA.findById(req.params.id);

        if (cta) {
            cta.status = req.body.status || cta.status;
            const updatedCTA = await cta.save();
            res.json(updatedCTA);
        } else {
            res.status(404).json({ message: 'CTA not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete CTA
// @route   DELETE /api/cta/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        const cta = await CTA.findById(req.params.id);

        if (cta) {
            await cta.deleteOne();
            res.json({ message: 'CTA removed' });
        } else {
            res.status(404).json({ message: 'CTA not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
