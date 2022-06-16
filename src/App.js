import './App.css';
import React , {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [updateData, setUpdateData] = useState();

    const [tasks, setTasks] = useState([
    {
        "id": 1,
        "text": "Doctors Appointment",
        "day": "Feb 5th at 2:30pm",
        "reminder": true
    },
    {
        "id": 2,
        "text": "Meeting at School",
        "day": "Feb 6th at 1:30pm",
        "reminder": true
    },
    {
        "id": 3,
        "text": "Meeting 2 at School",
        "day": "Feb 6th at 2:30pm",
        "reminder": false
    }
  ])
  
  // Add Tasks
  const addTask = (task) => {
    console.log(task);
    const id = Math.floor(Math.random() * 10000) + 1;
    const NewTask = { id, ...task};
    setTasks([...tasks, NewTask]);
  }

  // Update Task
  const updateTask = (data) => {
    //console.log(taskToUpdate, updTask, data);
    setTasks(
      tasks.map((task) => 
        task.id === data.id ? { ...task, text: data.text, day: data.day, reminder: data.reminder } : task
      )
    );
    setShowAddTask(false);
  }
  
  // Update Task data in form
  const updateSet = (task) => {
    setShowAddTask(false);
    setUpdateData(task);
    //setTasks(tasks.filter((task) => task.id !== id));
    setTimeout(function(){
      setShowAddTask(true);
    }, 0);
  }
  
  // Delete Tasks
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    console.log(id);
    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  }

  return (
    <Router>
      <div className="container">

        <Header onAdd={() => setShowAddTask(!showAddTask)} showForm={showAddTask} />
        
      <Routes>
        <Route path='/about' exact element={<About/>} ></Route>
          <Route path='/' exact element={
            <>
              {showAddTask && <AddTask 
                onAdd={addTask} 
                onUpdate={updateTask}
                updateData={updateData} />}
              {/* {showAddTask ? <AddTask onAdd={addTask} /> : ''} */}

              {tasks.length > 0 ? 
                (<Tasks tasks={tasks} 
                  updateClicks={updateSet} 
                  delClicks={deleteTask} 
                  dbReminders={toggleReminder} 
                  />) : ( 'No Tasks Found.' )
              }
            </>
          }></Route>

        </Routes>

      <Footer />
        
    </div>

    </Router>
  );
}

export default App;
