import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const TestReview = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // ✅ Normalize function now removes quotes + trims + lowercases
  const normalize = (str) =>
    (typeof str === 'string' ? str : String(str))
      .replace(/^["']|["']$/g, '')
      .trim()
      .toLowerCase();

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    if (location.state?.questions) {
      setQuestions(location.state.questions);
      setUserAnswers(savedAnswers);
    }
  }, [location.state]);

  if (!questions.length || Object.keys(userAnswers).length === 0) {
    return <div className="text-white p-10">No review data available.</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />
      <div className="ml-64 w-full p-10">
        <h1 className="text-3xl font-bold mb-6">Review Your Answers</h1>
        {/* 🧠 Score Summary */}
              
        <div className="bg-[#1E293B] p-4 rounded shadow mb-4 text-sm flex gap-6 flex-wrap">
          <p className="text-green-400 font-medium">✅ Correct: {
            questions.filter((q, i) =>
              normalize(userAnswers[i]) === normalize(q.correctAnswer)
            ).length
          }</p>

          <p className="text-red-400 font-medium">❌ Incorrect: {
            questions.filter((q, i) =>
              userAnswers[i] && normalize(userAnswers[i]) !== normalize(q.correctAnswer)
            ).length
          }</p>

          <p className="text-blue-400 font-medium">⚠ Unanswered: {
            questions.filter((_, i) => !userAnswers[i] || userAnswers[i].trim() === '').length
          }</p>

          <p className="text-yellow-400 font-medium">🧠 Score: {
            Math.round(
              (questions.filter((q, i) =>
                normalize(userAnswers[i]) === normalize(q.correctAnswer)
              ).length / questions.length) * 100
            ) + '%'
          }</p>
        </div>

        {/* 🎨 Color Legend */}
        <div className="flex gap-4 text-sm text-[#CBD5E1] mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm" />
            <span>Correct Answer Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-sm" />
            <span>Incorrect Answer Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 rounded-sm" />
            <span>Correct Answer (Not Selected)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm" />
            <span>Unanswered (Correct Option)</span>
          </div>
        </div>



        <div className="space-y-6 max-w-4xl overflow-y-auto max-h-[75vh] pr-2 scrollbar-thin scrollbar-thumb-transparent">
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index] || '';
            const correctAnswer = q.correctAnswer;
            const isUnanswered = !userAnswer.trim();
            const isCorrect = normalize(userAnswer) === normalize(correctAnswer);

              console.log({
              index,
              question: q.question,
              userAnswer: normalize(userAnswer),
              correctAnswer: normalize(correctAnswer),
              match: normalize(userAnswer) === normalize(correctAnswer),
            });


            return (
              <div key={index} className="bg-[#1E293B] p-4 rounded shadow relative">
                {/* Question with right-side status */}
                <div className="flex justify-between items-start">
                  <p className="font-semibold mb-4">
                    {index + 1}. {q.question}
                  </p>

                  <div>
                    {isUnanswered ? (
                      <span className="text-blue-400 font-medium">⚠️ Unanswered</span>
                    ) : isCorrect ? (
                      <span className="text-green-400 font-medium">✅ Correct</span>
                    ) : (
                      <span className="text-red-400 font-medium">❌ Incorrect</span>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, i) => {
                    const normalizedOpt = normalize(opt);
                    const selected = normalize(userAnswer) === normalizedOpt;
                    const correct = normalize(correctAnswer) === normalizedOpt;

                    let styles = 'border border-gray-600';

                    if (selected && correct) {
                      styles = 'border-green-500 bg-green-800/30'; // correct selection
                    } else if (selected && !correct) {
                      styles = 'border-red-500 bg-red-800/30'; // wrong selection
                    } else if (!selected && correct) {
                      styles = 'border-green-500 bg-green-800/20'; // correct answer not selected
                    } else if (isUnanswered && correct) {
                      styles = 'border-blue-500 bg-blue-800/20'; // unattempted, highlight correct
                    }


                    return (
                      <div key={i} className={`p-2 rounded ${styles}`}>
                        {opt}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="mt-4 text-sm">
                  {isUnanswered ? (
                    <p className="text-blue-400 font-medium">⚠ You did not attempt this question.</p>
                  ) : isCorrect ? (
                    <p className="text-green-400 font-medium">✅ Well done! You chose the right answer.</p>
                  ) : (
                    <p className="text-red-400 font-medium">❌ Your answer was incorrect.</p>
                  )}

                  {/* <p className="text-green-400">
                    ✔ Correct Answer: <strong>{correctAnswer}</strong>
                  </p> */}

                  <p className="text-[#CBD5E1] mt-1">
                    <strong>Explanation:</strong> {q.explanation || 'No explanation provided.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestReview;
