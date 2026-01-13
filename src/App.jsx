import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (!todo.trim()) return
    setTodos([...todos, { id: uuidv4(), todo }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id)
    if (!t) return
    setTodo(t.todo)
    setTodos(todos.filter(item => item.id !== id))
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const enterBtn = (e) => {
    if (e.key === "Enter") {
      handleAdd()
    }
  }



  return (
    <>
      <div className="min-h-screen max-w-screen p-4 flex flex-col items-center bg-linear-to-b from-blue-500 to-blue-950 ">
        <Navbar />
        <div className=" w-full max-w-md md:max-w-2x lg:max-w-3xl mx-auto my-4 p-6 bg-blue-300 border border-blue-900 rounded-3xl ">
          <div className="flex justify-center items-center mb-4 select-none">
            <h1 className="text-lg font-medium">
              What’s on your list today?
            </h1>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-base md:text-lg mb-2 select-none"> Add todo </h2>
            <div className="flex gap-2">
              <input onChange={handleChange}
                onKeyDown={enterBtn}
                value={todo} className="flex select-none bg-blue-100 h-10 w-full px-3 text-sm rounded-3xl outline-none focus:ring-0"
                type="text"
                placeholder="Enter a task" />
              <button onClick={handleAdd}
                className=" bg-blue-100 px-4 rounded-3xl font-medium text-sm hover:bg-blue-50 transition select-none"  >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="min-h-100 w-full max-w-md md:max-w-2x lg:max-w-3xl mx-auto p-5 bg-blue-300 rounded-3xl border border-blue-900">
          <h2 className="font-semibold text-lg select-none">Your todos</h2>
          {todos.length === 0 && <div className="flex justify-center m-5 select-none">No todos to display</div>}
          {todos.map(item => {
            return <div key={item.id} className="todos flex justify-between items-center gap-2 my-2 bg-blue-100 px-4 p-2 rounded-2xl">
              <div className="flex gap-2 select-none">
                <div>{item.todo}</div>
              </div>
              <div className="flex">
                <button onClick={() => { handleEdit(item.id) }} className="bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 transition flex justify-center items-center ">
                  <span className="material-symbols-outlined select-none">
                    Edit
                  </span>
                </button>
                <button onClick={() => { handleDelete(item.id) }} className="bg-red-500 text-white p-2 rounded-3xl hover:bg-red-600 transition ml-2 flex justify-center items-center">
                  <span className="material-symbols-outlined select-none">
                    Delete
                  </span>
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
