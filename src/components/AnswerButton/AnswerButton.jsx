import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./AnswerButton.css";
import { answerBtn, tick } from "../../assets/svgs";
import { useGameContext } from "../../contexts/GameContext/GameContext";

const AnswerButton = ({ num, clickedBtn, setClickedBtn }) => {
  const { quiz, setQuiz, question, setQuestion, setAnswer } = useGameContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickedBtn !== undefined) return;
    setClickedBtn(num);

    if (quiz[question]?.answers[num] === quiz[question]?.result) {
      setAnswer(true);
      quiz[question].isTrue = tick;
    } else {
      setAnswer(false);
    }
    console.log(quiz);
    setTimeout(() => {
      if (question < quiz.length - 1) {
        setQuestion(question + 1);
        setClickedBtn();
        setAnswer(null);
      } else {
        setClickedBtn();
        setAnswer(null);
        setQuestion(0);
        navigate("/result");
      }
    }, 500);
  };

  const trueBtnStyle = (() => {
    return (
      clickedBtn !== undefined &&
      quiz[question]?.answers[num] === quiz[question].result &&
      "answerTrue"
    );
  })();

  const clickedBtnStyle = (() => {
    return num === clickedBtn && "answerClicked";
  })();

  return (
    <button
      onClick={handleClick}
      className={`btn answer-btn ${clickedBtnStyle} ${trueBtnStyle}`}
    >
      {answerBtn(quiz[question]?.answers[num])}
    </button>
  );
};

export default AnswerButton;
