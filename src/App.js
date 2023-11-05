import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM1CbOilVvk4ZX9TzyVp8AwmDzv-xpEzM",
  authDomain: "rec-hackathon.firebaseapp.com",
  projectId: "rec-hackathon",
  storageBucket: "rec-hackathon.appspot.com",
  messagingSenderId: "150710317758",
  appId: "1:150710317758:web:cb50dd90d440775236e4ef",
  measurementId: "G-8QM5V9GK6P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const Quiz = () => {
  const location = useLocation();
  const userEmail = auth.currentUser.email;
  const [uEmail, setUserEmail] = useState("");
  useEffect(() => {
    setUserEmail(userEmail);
  }, []);
  const scoreCollection = collection(db, "score");
  const navigate = useNavigate();
  const quizData = {
    PythonMcq: [
      {
        question: "Losing interest or pleasure in doing things?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question: "Feeling down, depressed or helpless",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question: "Trouble falling or staying asleep, or sleeping too much?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question: "Feeling tired or having little energy",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question: "Poor appetite or overeating?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question:
          "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question:
          "Trouble concentrating on things, such as reading the newspaper or watching television?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question:
          "Moving or speaking so slowly that other people could have noticed or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question:
          "Thoughts that you would be better off dead, or of hurting yourself?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
      {
        question:
          " If you checked off any problems, how difficult have these problems made it for you at work, home, or with other people?",
        options: {
          a: "not at all",
          b: "several days",
          c: "more than half the days",
          d: "nearly every day",
        },
        correct_option: "a",
      },
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const handleOptionClick = (option) => {
    // If the user already selected an answer, do nothing
    if (selectedOption) {
      return;
    }

    // Set the selected option and check if it's correct
    setSelectedOption(option);
    const currentQuestion = quizData.PythonMcq[currentQuestionIndex];
    if (currentQuestion.correct_option === option) {
      setScore((prevScore) => prevScore + 1);
    }

    // Wait for a short time to show the user's selected answer
    setTimeout(async () => {
      if (currentQuestionIndex === quizData.PythonMcq.length - 1) {
        // Calculate the final score after the quiz is done
        let finalScore = score;

        // Get the user's email
        try {
          // Check if the user's score document exists in the score collection
          const scoreDocRef = doc(db, "scores", userEmail);
          const scoreDocSnap = await getDoc(scoreDocRef);

          if (scoreDocSnap.exists()) {
            // User's email exists, update the score in the existing document
            const existingScore = scoreDocSnap.data().score || 0;
            finalScore += existingScore;
            await updateDoc(scoreDocRef, { score: finalScore });
          } else {
            // User's email doesn't exist, create a new document with the email as ID and the score field inside it
            await setDoc(scoreDocRef, { score: finalScore, email: userEmail });
          }

          // Navigate to the example route after handling the score
          navigate("/example");
        } catch (error) {
          console.error("Error updating user score:", error);
          // Handle the error and navigate to the example route
          navigate("/example");
        }
      } else {
        setSelectedOption(""); // Reset selectedOption
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Go to the next question
      }
    }, 500);
  };

  const currentQuestion = quizData.PythonMcq[currentQuestionIndex];
  const options = Object.entries(currentQuestion.options);

  return (
    <div className="relative [background:linear-gradient(110.8deg,_#ffc989,_#fffcb9_48.96%,_rgba(255,_255,_255,_0))] w-full overflow-hidden flex flex-col py-[124px] px-36 box-border items-start justify-start gap-[10px] text-center text-41xl text-black font-roboto">
      <div className="self-stretch relative leading-[75.5px] capitalize font-medium">
        Take a Skill Test
      </div>
      <div className="self-stretch rounded-21xl bg-gray-700 [backdrop-filter:blur(30px)] overflow-hidden flex flex-col p-[130px] items-start justify-start gap-[20px] text-left text-13xl font-caption-heavy border-[1px] border-solid border-text-white">
        <div className="self-stretch relative">
          <span>Question {currentQuestionIndex + 1}/</span>
          <span className="text-[24px]">{quizData.PythonMcq.length}</span>
        </div>
        <div className="self-stretch h-[328px] flex flex-col items-start justify-start gap-[40px] text-[25px]">
          <div className="self-stretch flex flex-col items-center justify-center">
            <div className="self-stretch relative">
              {currentQuestion.question}
            </div>
          </div>
          <div className="self-stretch flex flex-col py-[26px] px-0 items-center justify-center gap-[20px]">
            {options.map(([optionKey, optionValue]) => (
              <button
                key={optionKey}
                onClick={() => handleOptionClick(optionKey)}
                className={`cursor-pointer [border:none] py-5 px-[52px] ${
                  selectedOption === optionKey
                    ? optionKey === currentQuestion.correct_option
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-darkorange-300"
                } self-stretch rounded-2xl flex flex-row items-center justify-center`}
              >
                <div className="flex flex-row items-end justify-start gap-[6px]">
                  <div
                    className={`relative text-xl leading-[16px] font-semibold font-caption-heavy ${
                      selectedOption === optionKey
                        ? "text-text-white"
                        : "text-black"
                    } text-left`}
                  >
                    {optionValue}
                  </div>
                  {selectedOption === optionKey && (
                    <img
                      className="relative w-3.5 h-3.5"
                      alt=""
                      src={
                        optionKey === currentQuestion.correct_option
                          ? "/checkmark-circle.svg"
                          : "/x-circle.svg"
                      }
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
