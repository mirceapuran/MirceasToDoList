import React, {useState, useEffect} from 'react';
import './App.css';
import edit from './edit.png';
import delet from './delete.png';
import checked from './checked.png';

function App() {
  const [date, setDate] = useState(new Date());
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDeadDate, setNewDeadDate] = useState('');
  const [newDeadTime, setNewDeadTime] = useState('');
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('');

  const handleAddTodo = () => {
    let newTodo = { 
      title: newTitle, 
      deadlineDate: newDeadDate, 
      deadlineTime: newDeadTime,
      completed: false
    };
    let updatedTodoArray = [...allTodos, newTodo];
    setAllTodos(updatedTodoArray);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArray));
  }

  const handleDeleteTodo = (index) => {
    let reducedTodoArray = [...allTodos];
    reducedTodoArray.splice(index, 1); 
    setAllTodos(reducedTodoArray);
    localStorage.setItem('todolist', JSON.stringify(reducedTodoArray));
  }

  const handleCompletedTodo = (index) => {
    let updatedTodoArray = [...allTodos];
    updatedTodoArray[index].completed = !updatedTodoArray[index].completed;
    setAllTodos(updatedTodoArray);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArray));
  }

  const handleEdit = (index) => {
    setCurrentEdit(index);
    setCurrentEditedItem(allTodos[index]);
  }

  const handleUpdateTitle = (newTitle) => {
    let updatedTodoArray = [...allTodos];
    updatedTodoArray[currentEdit].title = newTitle;
    setAllTodos(updatedTodoArray);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArray));
  }

  const handleUpdateDate = (newDate) => {
    let updatedTodoArray = [...allTodos];
    updatedTodoArray[currentEdit].deadlineDate = newDate;
    setAllTodos(updatedTodoArray);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArray));
  }

  const handleUpdateTime = (newTime) => {
    let updatedTodoArray = [...allTodos];
    updatedTodoArray[currentEdit].deadlineTime = newTime;
    setAllTodos(updatedTodoArray);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArray));
  }

  const handleUpdateTodo = () => {
    setCurrentEdit('');
    setCurrentEditedItem('');
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
  },[]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return function cleanup() {
      clearInterval(timer);
    }
  },[]);

  const applyStyles = () => {
    const todos = JSON.parse(localStorage.getItem('todolist')) || [];
    const taskBoxes = document.getElementsByClassName('task-box');
    const taskDeadlines = document.getElementsByClassName('task-deadline');

    todos.forEach((todo, index) => {
        if (todo.completed && taskBoxes[index] && taskDeadlines[index]) {
            taskBoxes[index].style.color = 'grey';
            taskBoxes[index].style.textDecoration = 'line-through';
            taskDeadlines[index].innerHTML = 'Completed';
            taskDeadlines[index].style.color = 'lightgreen';
        } 
    });
};

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todolist')) || [];
    setAllTodos(storedTodos);
  }, []);

  // Apply styles whenever `allTodos` updates
  useEffect(() => {
    applyStyles();
  }, [allTodos]);

  return (
    <div className="App">
      <div className="title-card">
        <div className="title-card-item">
          <h1><big>Mircea's To-Do-List</big></h1>
        </div>
        <div className="title-card-item">
          <h1>{date.toLocaleDateString()}</h1>
          <h1>{date.toLocaleTimeString()}</h1>
        </div>
      </div>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Task</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Add a task"/>
          </div>
          <div className="todo-input-item">
            <label>Deadline</label>
            <input type="date" value={newDeadDate} onChange={(e)=>setNewDeadDate(e.target.value)}/>
            <input type="time" value={newDeadTime} onChange={(e)=>setNewDeadTime(e.target.value)}/>
          </div>
        </div>
        <div className="to-do-add">
          <button id="add-task" onClick={handleAddTodo}>Add</button>
          <button>Sort by Date</button>
        </div>
      </div>
      
      <div className="todo-list">
        {allTodos.map((item, index) => {
          /**/if (currentEdit === index) {
            return (
              <div className="edit-wrapper" key={index}>
                <input placeholder="Update title..." onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title}/>
                <input placeholder="Update deadline date..." onChange={(e)=>handleUpdateDate(e.target.value)} value={currentEditedItem.deadlineDate}/>
                <input placeholder="Update deadline time..." onChange={(e)=>handleUpdateTime(e.target.value)} value={currentEditedItem.deadlineTime}/>
                <button onClick={handleUpdateTodo}>Submit changes</button>
              </div>
            );
          } else {
            return (
              <div className="task-item" key={index}>
                <div className="task-box">
                  <div><big><big>{item.title}</big></big></div>
                </div>
                <div className="task-deadline">
                  <div className="task-date">{item.completed ? "Completed" : item.deadlineDate}</div>
                  <div className="task-time">{item.completed ? "" : item.deadlineTime}</div>
                </div>
                <div className="task-buttons">
                  <img src={edit} onClick={()=>handleEdit(index)} alt="rip"></img>
                  <img src={delet} onClick={()=>handleDeleteTodo(index)} alt="rip"></img>
                  <img src={checked} onClick={()=>handleCompletedTodo(index)} alt="rip"></img>
                </div>
              </div>
            );
          }       
        })}
        </div>
      </div>
  );
}

export default App;