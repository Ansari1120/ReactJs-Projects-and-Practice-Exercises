import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import image from "./assets/pngwing.com.png";
import Options from "./components/options.js";
import Buttons from "./components/commonbuttons.js";
import { Box } from "@mui/system";
import ReviewAnswer from "./components/Status.js";
import "./index.css";
import { Typography } from "@mui/material";
function App() {
  const questions = [
    {
      question:
        "What is the process of finding errors and fixing them within a program.",
      answer: "Debugging",
      options: ["Compiling", "Executing", "Debugging", "Scanning"],
    },
    {
      question:
        "Kim has just constructed her first for loop within the Java language.  Which of the following is not a required part of a for loop",
      answer: "Variable",
      options: ["Initialization", "Condition", "Variable", "increment"],
    },
    {
      question: "During program development, software requirements specify",
      answer: "What the task is that the program must perform",
      options: [
        "How the program will accomplish the task ",
        "What the task is that the program must perform",
        "How to divide the task into subtasks",
        "How to test the program when it is done",
      ],
    },
    {
      question: "Which command will stop an infinite loop",
      answer: "Ctrl - C",
      options: ["Alt - C", "Shift - C", "Esc", "Ctrl - C"],
    },
    {
      question: " A loop that never ends is referred to as a",
      answer: "Infinite loop",
      options: ["While loop", "Infinite loop", "Recursive loop", "for loop"],
    },
  ];
  const [Index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [Result, setResult] = useState(false);
  let [Sec, setSec] = useState(0);
  let [Minutes, setMinutes] = useState(0);
  const [status, setStatus] = useState("fail");
  const [percentage, setPercentage] = useState(0);
  const [countdown, setcountdown] = useState(59);
  const [countdownMin, setcountdownMin] = useState(2);
  const [arr, setArr] = useState([]);
  const [checkUser, setcheckUser] = useState(false);
  let Timeout, countout;
  let initial = 5;
  let total_marks = initial * questions.length;

  //Total Score and Result update arrow function
  const checkAnswer = (UserAnswer, CorrectAnswer) => {
    if (UserAnswer === CorrectAnswer) {
      setScore(score + initial);
    }
    arr.push(UserAnswer); // add new value in array
    setArr([...arr]);
    setcheckUser(true);
    console.log(Index);
  };

  //go forward
  const Next = () => {
    //call result screen
    if (Index + 1 === questions.length) {
      setResult(true);
    }
    if (checkUser) {
      setIndex(Index + 1);
      setcheckUser(false);
    } else {
      alert("Please Choose An Option To proceed Further !");
      console.log("Please Choose An Option To proceed Further !");
    }
  };
  const RevNext = () => {
    if (Index <= 4 || checkUser) {
      setIndex(Index + 1);
      clearInterval(countout);
      console.log(Index);
      // setcheckUser(true);
    } else {
      alert("This is Last Question , Click Back to Review More Answers!");
      console.log("This is Last Question , Click Back to Review More Answers!");
    }
    setcheckUser(false);
  };
  //go backward
  const Back = () => {
    if (Index === 0) {
      alert("Please Choose an Option Then Click Next !");
      console.log("Please Choose an Option Then Click Next !");
    } else {
      setIndex(Index - 1);
    }
  };
  const RevBack = () => {
    if (!(Index > 1)) {
      alert("This is First Question , Click Next to Review More Answers");
      console.log("This is First Question , Click Next to Review More Answers");
      // setcheckUser(true);
    } else {
      setIndex(Index - 1);
      setcheckUser(true);
      clearInterval(countout);
    }
  };
  //Made simple Timer with minutes and seconds to update.
  useEffect(() => {
    //timer
    if (Sec <= 59) {
      Timeout = setTimeout(() => setSec(Sec + 1), 1000);
    } else {
      setSec(0);
    }
    if (Sec === 59) {
      setMinutes(Minutes + 1);
    }
    //countdown
    if (countdown >= 0) {
      countout = setTimeout(() => setcountdown(countdown - 1), 1000);
    } else {
      setcountdown(59);
    }
    if (countdown === 0) {
      setcountdownMin(countdownMin - 1);
    }
    // needs to stop the timer when all questions completed !
    if (Index === 5 || (countdown === 0 && countdownMin === 1)) {
      clearInterval(Timeout);
    }
    //precentage portion
    let perc = (score / total_marks) * 100;
    setPercentage(perc);
    //status portion
    if (percentage >= 40) {
      setStatus("pass");
    }
    if (countdownMin === 1 && countdown === 0) {
      clearInterval(countout);
      setResult(true);
    }
  }, [Sec, countdown]);
  //restart quiz
  function Try() {
    setIndex(0);
    setScore(0);
    setResult(false);
    setMinutes(0);
    setSec(0);
    setPercentage(0);
    setStatus("fail");
    setcountdown(59);
    setcountdownMin(2);
    setArr([]);
    setcheckUser(false);
  }
  return (
    <Box className="Main">
      <Box className="Header">QUIZ-NAME : PROGRAMMING QUIZ</Box>
      <br />
      <br />
      {Result ? (
        <>
          <img className="img" src={image} alt="Logo" width={100} />
          <h1>
            Your marks is : {score} / {total_marks}
          </h1>
          <Box>
            Time Taken : {Minutes} mins {Sec} sec
          </Box>
          <Box>Percentage : {percentage + " %"}</Box>
          <Box>Status : {status}</Box>
          <Box>
            <Buttons func={Try} info="Try Again !" />
          </Box>
          <Box>
            <ReviewAnswer
              ques={questions[Index - 1].question}
              correctOption={questions[Index - 1].answer}
              selectedOption={arr[Index - 1]}
              onBack={RevBack}
              onNext={RevNext}
            />
          </Box>
        </>
      ) : (
        <>
          <label>
            {" "}
            Time Remaining : {"-"} {countdownMin} mins {countdown} sec
          </label>
          <br />
          <Box className="QuestionDetails">
            <Typography variant="h4" className="QuestionDetail">
              Question # {Index + 1} of {questions.length}
            </Typography>
            <label>Marks 05</label>
          </Box>
          <h1 className="QuestionDetails">{questions[Index].question}</h1>
          <br />
          <br />
          <Box className="Question">
            <Options check={checkAnswer} data={questions} ind={Index} />
          </Box>
          <Box>
            <Buttons func={Next} info="Next Question >" />
          </Box>
          <Box>
            <Buttons func={Back} info="Go Back <" />
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
