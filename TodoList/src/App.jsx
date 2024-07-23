import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [allTodos, setallTodos] = useState([]);
  const [isFinished, setisFinished] = useState(true);

  // useEffect
  useEffect(() => {
    let todoLocal = localStorage.getItem("allTodos");
    if (todoLocal) {
      let todos = JSON.parse(todoLocal);
      setallTodos(todos);
    }
  }, []);

  // handleAdd function
  const handleAdd = () => {
    setallTodos([...allTodos, { todo, id: uuidv4(), isCompleted: false }]);
    settodo("");
    saveToLocal();
  };

  // handleCheck function
  const handleCheck = (e) => {
    let id = e.target.id;
    let index = allTodos.findIndex((item) => item.id === id);
    let newTodos = [...allTodos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setallTodos(newTodos);
    saveToLocal();
  };

  // handleEdit function
  const handleEdit = (id) => {
    // Find the todo item to edit by its id
    const todoToEdit = allTodos.find((item) => item.id === id);
    
    // If no todo is found, exit early or handle appropriately
    if (!todoToEdit) {
      // Handle the case where no todo is found, if needed
      return;
    }
    
    // Set the todo input field to the todo text to edit
    settodo(todoToEdit.todo);
    
    // Remove the todo from the list temporarily for editing
    const filteredTodos = allTodos.filter((item) => item.id !== id);
    setallTodos(filteredTodos);
    
    // Optionally, you can scroll the user to the top of the page or to the input field
    // For example, window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Save to local storage after updating state
    saveToLocal();
  };
  

  // handleDelete function
  const handleDelete = (e, id) => {
    let newTodos = allTodos.filter((item) => item.id !== id);
    setallTodos(newTodos);
    saveToLocal();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleFinished = () => {
    setisFinished(!isFinished);
  };

  // saveToLocal function
  const saveToLocal = () => {
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-3/5 ">
        <h1 className="text-3xl md:text-5xl font-serif font-semibold text-right p-4">To Do List</h1>
        <div className="Container bg-indigo-200 min-h-[80vh] p-4 md:p-6 rounded-xl mx-auto my-5 w-11/12 md:w-4/5 mb-5">
          <div className="AddTodo mb-5">
            <h2 className="font-mono text-lg md:text-xl mb-5">Add Your Todo</h2>
            <input
              onChange={handleChange}
              type="text"
              value={todo}
              placeholder="Add"
              className="text w-full md:w-3/4 p-2 rounded-xl"
            />
            <button
              onClick={handleAdd}
              className="block md:inline-block mt-3 md:mt-0 md:float-right md:mr-9 w-full md:w-20 h-10 md:h-7 rounded-xl bg-indigo-500"
              disabled={todo.length < 3}
            >
              Add
            </button>
          </div>
          <h2 className="font-mono text-lg md:text-xl mb-5">Your Todos</h2>
          <div className="Todos">
            <div className="showFinished flex mb-4">
              <input
                type="checkbox"
                onChange={handleFinished}
                checked={isFinished}
              />
              <div className="p-1 font-medium font-Titan One text-xl">Show Finished Todos</div>
            </div>
            {allTodos.length === 0 && <div>Enter your To Do</div>}
            {allTodos.map((item) => {
              return (
                (isFinished || !item.isCompleted) && (
                  <div className="flex mb-3" key={item.id}>
                    <input
                      type="checkbox"
                      id={item.id}
                      onChange={handleCheck}
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted?"todo flex justify-between items-center rounded-xl p-3 h-12 md:h-10 w-full bg-green-300":"todo flex justify-between items-center rounded-xl bg-white p-3 h-12 md:h-10 w-full"}>
                      <div className={item.isCompleted ? "line-through font-Inconsolata font-semibold" : "font-Inconsolata font-semibold"}>
                        {item.todo}
                      </div>
                      <div className="buttons flex">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="w-20 h-10 md:h-7 rounded-xl bg-indigo-500 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="w-20 h-10 md:h-7 rounded-xl bg-indigo-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-2/5 h-full bg-cover" style={{ backgroundImage: "url('./src/Checklist.jpg')" }}>
      </div>
    </div>
  );
}

export default App;
