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
      let todos = JSON.parse(localStorage.getItem("allTodos"));
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
    let index = allTodos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...allTodos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setallTodos(newTodos);
    saveToLocal();
  };

  // handleEdit function 

  const handleEdit = (id) => {
    let t = allTodos.filter((item) => {
      return item.id === id;
    });
    settodo(t[0].todo);
    let newTodos = allTodos.filter((item) => {
      return item.id !== id;
    });
    setallTodos(newTodos);
    saveToLocal();
  };

// handleDelete function 

  const handleDelete = (e, id) => {
    let newTodos = allTodos.filter((item) => {
      return item.id !== id;
    });
    setallTodos(newTodos);
    saveToLocal();
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleFinished = (e)=>{
    setisFinished(!isFinished)
  }

  //saveToLocal function 

  const saveToLocal = () => {
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };


  return (
    <>
      <h1 className="text-5xl font-lato text-center p-4">To Do List</h1>

      <div className="Container bg-indigo-200 min-h-[80vh] p-6 rounded-xl mx-auto my-5 w-3/6 mb-5">
        <div className="AddTodo mb-5">
          <h2 className="font-mono text-xl mb-5">Add Your Todo</h2>
          <input
            onChange={handleChange}
            type="text"
            value={todo}
            placeholder="Add"
            className="text w-3/4 p-2 rounded-xl"
          />
          <button
            onClick={handleAdd}
            className="float-right mr-9 mt-3 w-20 h-7 rounded-xl bg-indigo-500 "
            disabled={todo.length<3}>
            Add
          </button>
        </div>


        <h2 className="font-mono text-xl mb-5">Your Todos</h2>

        <div className="Todos">
          <div className="showFinished flex">
            <input type="checkbox" onChange={handleFinished} checked={isFinished}  />
          <div className="p-1 font-medium">Show Finished Todos</div>
          </div>
         
          {allTodos.length === 0 && <div>Enter your To Do</div>}

          {allTodos.map((item) => {
            return(isFinished||!item.isCompleted)&&<div className="flex mb-3 " key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  onClick={handleCheck}
                  checked={item.isCompleted}
                />

                <div className="todo flex justify-between items-center rounded-xl bg-white p-1 h-10 w-full">
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                  <div className="buttons ">

                    <button
                      onClick={(e) => {
                        handleEdit(item.id);
                      }}
                      className=" w-20 h-7 rounded-xl bg-indigo-500 mr-2"
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className=" w-20 h-7 rounded-xl bg-indigo-500 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            
          })}
        </div>
      </div>
    </>
  );
}

export default App;
