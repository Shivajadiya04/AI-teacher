import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const TestReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const normalize = (str) =>
    (typeof str === 'string' ? str : String(str))
      .replace(/^["']|["']$/g, '')
      .trim()
      .toLowerCase();

  // ✅ Ab backend ko dobara call nahi karenge, direct location.state ka use karenge
  useEffect(() => {
    if (location.state?.questions) {
      setQuestions(location.state.questions);
      setScore(location.state.percentage);
      setUserAnswers(
        JSON.parse(localStorage.getItem('userAnswers')) || {}
      );
    }
  }, [location.state]);

  if (!questions.length) {
    return <div className="text-white p-10">No review data available.</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />
      <div className="ml-64 w-full p-10">
        <h1 className="text-3xl font-bold mb-6">Review Your Answers</h1>

        {/* 🧠 Score Summary */}
        <div className="bg-[#1E293B] p-4 rounded shadow mb-4 text-sm flex gap-6 flex-wrap">
          <p className="text-green-400 font-medium">
            ✅ Correct: {questions.filter(q => q.match).length}
          </p>
          <p className="text-red-400 font-medium">
            ❌ Incorrect: {questions.filter(q => !q.match && q.userAnswer).length}
          </p>
          <p className="text-blue-400 font-medium">
            ⚠ Unanswered: {questions.filter(q => !q.userAnswer || q.userAnswer.trim() === '').length}
          </p>
          <p className="text-yellow-400 font-medium">
            🧠 Score: {score !== null ? `${score}%` : '...'}
          </p>
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

        {/* Question List */}
        <div className="space-y-6 max-w-4xl overflow-y-auto max-h-[75vh] pr-2 scrollbar-thin scrollbar-thumb-transparent">
          {questions.map((q, index) => {
            const isUnanswered = !q.userAnswer?.trim();
            const isCorrect = q.match;

            return (
              <div key={index} className="bg-[#1E293B] p-4 rounded shadow relative">
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
                    const selected = normalize(q.userAnswer) === normalize(opt);
                    const correct = normalize(q.correctAnswer) === normalize(opt);

                    let styles = 'border border-gray-600';
                    if (selected && correct) {
                      styles = 'border-green-500 bg-green-800/30';
                    } else if (selected && !correct) {
                      styles = 'border-red-500 bg-red-800/30';
                    } else if (!selected && correct) {
                      styles = 'border-green-500 bg-green-800/20';
                    } else if (isUnanswered && correct) {
                      styles = 'border-blue-500 bg-blue-800/20';
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
                  <p className="text-[#CBD5E1] mt-1">
                    <strong>Explanation:</strong> {q.explanation || 'No explanation provided.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            navigate('/roadmap');
          }}
          className="mt-6 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2 rounded font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TestReview;
