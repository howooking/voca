const toeicWords = require("./toeic");
const Word = require("../models/vocaModel");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://howoo:1234@cluster0.sxaggeo.mongodb.net/voca?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

const setData = async () => {
  await Word.deleteMany({});
  for (let i = 0; i < toeicWords.length; i++) {
    const word = new Word({
      eng: toeicWords[i].eng,
      kor: toeicWords[i].kor,
      isDone: false,
    });
    await word.save();
  }
};
setData();
