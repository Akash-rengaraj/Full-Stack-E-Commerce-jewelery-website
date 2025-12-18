const Material = require('../models/Material');

// @desc    Fetch all materials
// @route   GET /api/materials
// @access  Public
const getMaterials = async (req, res) => {
    try {
        const materials = await Material.find({});
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single material
// @route   GET /api/materials/:id
// @access  Public
const getMaterialById = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (material) {
            res.json(material);
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a material
// @route   POST /api/materials
// @access  Private/Admin
const createMaterial = async (req, res) => {
    const { name, description } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: 'Material name is required' });
        }

        const materialExists = await Material.findOne({ name });

        if (materialExists) {
            return res.status(400).json({ message: 'Material already exists' });
        }

        const material = await Material.create({
            name,
            description,
        });

        if (material) {
            res.status(201).json(material);
        } else {
            res.status(400).json({ message: 'Invalid material data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a material
// @route   PUT /api/materials/:id
// @access  Private/Admin
const updateMaterial = async (req, res) => {
    const { name, description } = req.body;

    try {
        const material = await Material.findById(req.params.id);

        if (material) {
            material.name = name || material.name;
            material.description = description || material.description;

            const updatedMaterial = await material.save();
            res.json(updatedMaterial);
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a material
// @route   DELETE /api/materials/:id
// @access  Private/Admin
const deleteMaterial = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (material) {
            await material.deleteOne();
            res.json({ message: 'Material removed' });
        } else {
            res.status(404).json({ message: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
};
