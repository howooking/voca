const express = require("express");
const {
  getVocas,
  getVoca,
  createVoca,
  updateVoca,
  deleteVoca,
} = require("../controllers/vocaControllers");
const router = express.Router();

//Get all vocabularies
router.get("/", getVocas);
//Get a sigle vocabulary
router.get("/:id", getVoca);
//Create a vocabulary
router.post("/", createVoca);
//Update a vocabulary
router.patch("/:id", updateVoca);
//Delete a vocabulary
router.delete("/:id", deleteVoca);

module.exports = router;
