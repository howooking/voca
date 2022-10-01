import axios from "axios";
import { useState, useEffect } from "react";
import WordCard from "../components/WordCard";

export const Home = () => {
  type wordType = {
    _id: string;
    eng: string;
    kor: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  const [words, setWords] = useState<wordType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/voca");
        const data = await response.data;
        setWords(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="cards">
      {words.map((word) => (
        <WordCard {...word} key={word._id} />
      ))}
    </div>
  );
};
