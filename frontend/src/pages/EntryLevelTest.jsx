import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import UserContext from '../context/UserContext';

const EntryLevelTest = ({ onTestSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('entryTestQuestions');
    const fetchQuestions = async () => {
      try {
        const storedSkills = localStorage.getItem('skillsYouHave');
        const skillsArray = storedSkills ? JSON.parse(storedSkills) : [];

        if (!skillsArray || skillsArray.length === 0) {
          setErrorMsg('No skills found to generate questions.');
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/test/generate`,
          {
            skills: skillsArray.join(', '),
          }
        );

        if (response.data.questions?.length > 0) {
          setQuestions(response.data.questions);
          localStorage.setItem('entryTestQuestions', JSON.stringify(response.data.questions));
        } else {
          setErrorMsg('No questions received. Please try again.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setErrorMsg('Error fetching questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (questionIndex, selectedOption) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
  const answersArray = questions.map((_, index) => userAnswers[index] || '');
  const token = localStorage.getItem('token');

  if (!token) {
    alert("Please login first. No token found.");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/test/submit`,
      { userAnswers: answersArray },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { total, correct, percentage, questions: reviewedQuestions } = response.data;

    if (typeof onTestSubmit === 'function') {
      onTestSubmit(); // Refresh dashboard
    }

    navigate('/review', {
      state: {
        questions: reviewedQuestions,
        total,
        correct,
        percentage,
      },
    });

  } catch (error) {
    console.error('Submit failed:', error);
    alert('Submit failed: ' + (error?.response?.data?.message || error.message));
  }
};


  return (
    <div className="flex min-h-screen bg-[#1d2333] text-white">
      <Sidebar />
      <div className="flex flex-col items-center ml-[40vh] p-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Entry-Level Assessment</h1>
          <p className="mb-8 text-[#CBD5E1] max-w-2xl">
            This test is generated based on the <strong>skills you are having</strong> to help you prepare for job interviews.
          </p>

          {!userLoading && user && (
            <p className="mb-4 text-sm text-gray-400">Logged in as: {user.name}</p>
          )}

          {loading ? (
            <p className="text-white">Loading questions...</p>
          ) : errorMsg ? (
            <p className="text-red-400">{errorMsg}</p>
          ) : (
            <div className="space-y-6 w-full max-w-4xl overflow-y-auto max-h-[75vh] scrollbar-thin scrollbar-thumb-transparent">
              {questions.map((q, index) => (
                <div key={index} className="bg-[#1E293B] p-4 rounded shadow">
                  <p className="font-medium mb-2">{index + 1}. {q.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, i) => (
                      <label key={i} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`q-${index}`}
                          value={opt}
                          checked={userAnswers[index] === opt}
                          onChange={() => handleChange(index, opt)}
                          className="accent-purple-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="mt-6 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2 rounded font-semibold"
              >
                Submit Test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryLevelTest;
