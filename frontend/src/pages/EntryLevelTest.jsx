import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const EntryLevelTest = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

 useEffect(() => {
  localStorage.removeItem('entryTestQuestions');
  const fetchQuestions = async () => {
    try {
      const saved = localStorage.getItem('entryTestQuestions');
        if (saved) {
          setQuestions(JSON.parse(saved));
          setLoading(false);
          return;
        }

      const storedSkills = localStorage.getItem('skillsYouHave');
      console.log('🟢 Skills from localStorage:', storedSkills);

      const skillsArray = storedSkills ? JSON.parse(storedSkills) : [];
      console.log('🟡 Skills sent to API:', skillsArray.join(', '));
      

      if (!skillsArray || skillsArray.length === 0) {
        setErrorMsg('No skills found to generate questions.');
        setLoading(false);
        return;
      }

      setQuestions([]);

      const response = await axios.post('http://localhost:5000/api/test/generate', {
        skills: skillsArray.join(', '),
      });

      if (response.data.questions && response.data.questions.length > 0) {
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

  
  // Handle answer selectio

  const handleChange = (questionIndex, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmit = () => {
    console.log('User answers:', userAnswers);
    alert("✅ Test submitted! You can now review your answers.");
  };

  return (
    <div className="flex min-h-screen bg-[#1d2333]  text-white">
      <Sidebar />

      <div className="flex flex-col items-center ml-[40vh]  p-10">
        <div className="w-full max-w-4xl ">
          <h1 className="text-3xl font-bold mb-2">Entry-Level Assessment</h1>
        <p className="mb-8 text-[#CBD5E1] max-w-2xl">
          This test is generated based on the <strong>skills you are having </strong> to help you prepare for job interviews.
        </p>

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
