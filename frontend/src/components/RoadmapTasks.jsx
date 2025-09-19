import React from 'react';

const RoadmapTasks = ({ roadmap, onToggle }) => {
  if (!roadmap || !Array.isArray(roadmap.steps)) return null;

  console.log('🧠 Roadmap steps:', roadmap.steps);

  // Group tasks by week
  const grouped = roadmap.steps.reduce((acc, step) => {
    const key = step.week || 'General';
    acc[key] = acc[key] || [];
    acc[key].push(step);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([week, steps]) => (
        <div key={week}>
          <h4 className="text-md font-semibold mb-2">{week}</h4>
          <ul className="space-y-2">
            {steps.map((step) => {
              const isTask =
                step.title &&
                !step.title.toLowerCase().includes('week') &&
                !step.title.toLowerCase().includes('resources');

              return (
                <li key={step._id} className="flex items-center">
                  {isTask ? (
                    <>
                      <input
                        type="checkbox"
                        checked={step.done}
                        onChange={() =>
                          onToggle(roadmap._id, step._id, !step.done)
                        }
                        className="mr-2"
                      />
                      <span
                        className={
                          step.done ? 'line-through text-gray-500' : ''
                        }
                      >
                        {step.title}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      {step.title}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RoadmapTasks;
