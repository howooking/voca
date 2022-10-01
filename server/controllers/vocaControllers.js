const Voca = require("../models/vocaModel");
const mongoose = require("mongoose");
//Get all vocabularies
const getVocas = async (req, res) => {
  const vocas = await Voca.find({}).sort({ createdAt: -1 });
  res.status(200).json(vocas);
};
//Get a sigle vocabulary
const getVoca = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "vocabulary not found" });
  }
  const voca = await Voca.findById(id);
  if (!voca) {
    return res.status(404).json({ error: "vocabulary not found" });
  }
  res.status(200).json(voca);
};
//Create a vocabulary
const createVoca = async (req, res) => {
  try {
    const newVoca = await Voca.create(req.body);
    res.status(200).json(newVoca);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update a vocabulary
const updateVoca = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "vocabulary not found" });
  }
  const updatedVoca = await Voca.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedVoca) {
    return res.status(404).json({ error: "vocabulary not found" });
  }
  res.status(200).json(updatedVoca);
};
//Delete a vocabulary
const deleteVoca = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "vocabulary not found" });
  }
  const deletedVoca = await Voca.findByIdAndDelete(id);
  if (!deletedVoca) {
    return res.status(404).json({ error: "vocabulary not found" });
  }
  res.status(200).json(deletedVoca);
};
module.exports = {
  getVocas,
  getVoca,
  createVoca,
  updateVoca,
  deleteVoca,
};
