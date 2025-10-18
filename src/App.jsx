import React from "react";
import { useState, useEffect } from "react";



function App() {
  const [tasks, setTasks] = useState("");

  const [taskList, setTaskList] = useState(() => {
    let saved = localStorage.getItem("tasksHistory");
    return saved ? JSON.parse(saved) : 0;
  });

  const [finishedTask, setFinishTasks] = useState(() => {
    let saved = localStorage.getItem("finishedTasks");
    return saved ? JSON.parse(saved) : [];
  });

  function saveTask(e) {
    e.preventDefault();
    tasks ? setTaskList([...taskList, tasks]) : alert("enter task");
    setTasks("");
  }

  function removeTask(index) {
    setTaskList(taskList.filter((item, i) => i !== index));
  }
  useEffect(() => {
    localStorage.setItem("tasksHistory", JSON.stringify(taskList));
  }, [taskList]);
  function editTask(index) {
    setTasks(taskList[index]);
    removeTask(index);
  }
  function finishTask(index) {
    setFinishTasks([
      ...finishedTask,
      taskList.filter((items, i) => i == index),
    ]);
    removeTask(index);
  }

  function removeFinishedTask(index) {
    setFinishTasks(finishedTask.filter((item, i) => i !== index));
  }
  useEffect(() => {
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTask));
  }, [finishedTask]);

  const [percen, setPercen] = useState(0);
  useEffect(
    () => {
      finishedTask.length + taskList.length > 0
        ? setPercen(
            Math.round(
              (finishedTask.length / (finishedTask.length + taskList.length)) *
                100
            )
          )
        : "";
    },
    [taskList],
    [finishedTask]
  );
  console.log(finishedTask);
  return (
    <div className="min-h-screen bg-slate-400 p-7">
      <h1 className="text-center mb-11 bg-green-500 text-white">
        Progrss:- {percen}%
      </h1>
      <form action="">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="write something"
            value={tasks}
            onChange={(e) => {
              setTasks(e.target.value);
            }}
            className="w-80    rounded-md p-1"
          />
          <button
            onClick={(e) => saveTask(e)}
            className="bg-slate-900 text-white p-1 mx-2 rounded-md"
          >
            save
          </button>
        </div>
      </form>
      <ul className="list-disc">
        <h2 className="text-3xl font-semibold m-3">List:-</h2>
        {taskList.map((item, index) => {
          return (
            <div className="flex justify-between mb-3">
              <li key={index} className="text-xl ">
                {item}
              </li>
              <div>
                <button
                  onClick={() => removeTask(index)}
                  className="bg-red-500 text-white p-1 rounded-md mx-4"
                >
                  delete
                </button>
                <button
                  onClick={() => editTask(index)}
                  className="bg-slate-900 text-white p-1 rounded-md mx-4"
                >
                  edit
                </button>
                <button
                  onClick={() => finishTask(index)}
                  className="bg-slate-900 text-white p-1 rounded-md"
                >
                  Finish
                </button>
              </div>
            </div>
          );
        })}
        <hr />
        <h1 className="text-3xl mt-9">Finished tasks:-</h1>

        {finishedTask.map((item, index) => {
          return (
            <div className="flex justify-between mb-3 text-gray-200">
              <li key={index} className="text-xl line-through">
                {item}
              </li>
              <button
                onClick={() => removeFinishedTask(index)}
                className="bg-red-500 text-white p-1 rounded-md mx-4"
              >
                delete
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
export default App;
