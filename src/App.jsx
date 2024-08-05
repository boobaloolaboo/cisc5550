import { useState, useEffect } from 'react'
import { Datepicker } from "flowbite-react";
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState ([]);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem('theme'))
  );

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/items");
    console.log(response.data);
    setArray(response.data);
  };

  useEffect(() => {
    fetchAPI();
  },[])

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <div className="hero bg-base-400 min-h-screen" data-theme={theme}>

        <div className="navbar bg-base-100 fixed z-20 top-0">
          
          <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                    Theme
                    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Lofi" value={theme} onChange={() => setTheme("lofi")}/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Forest" value={theme} onChange={() => setTheme("forest")}/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cupcake" value={theme} onChange={() => setTheme("cupcake")}/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value={theme} onChange={() => setTheme("valentine")}/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Lemonade" value={theme} onChange={() => setTheme("lemonade")}/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Synthwave" value={theme} onChange={() => setTheme("synthwave")}/></li>
                    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value={theme} onChange={() => setTheme("cyberpunk")}/></li>
                </ul>
              </div>
        </div>
          

        <div className="hero-content text-center">
          <div>
            {array.length != 0 ? <>
          <h1 className="text-5xl font-bold mb-20">Let's get going!</h1>
            </> : <>
          <h1 className="text-5xl font-bold mb-20">All done!</h1>
            </>}
              <table className="table">
                <thead>
                  <tr className="grid grid-cols-[70px_170px_170px_70px]">
                    <th>Status</th>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {array.map(todo => (
                    <tbody>
                      <tr className="grid grid-cols-[70px_170px_170px_70px]">
                        <th>
                          <label>
                            <input type="checkbox" checked={todo.status} className="checkbox btn-outline" onClick={(e) => {e.preventDefault(); window.location.href="http://localhost:8080/api/items/mark/"+todo.what_to_do;}}/>
                          </label>
                        </th>
                        <td>{todo.what_to_do}</td>
                        <td>{todo.due_date}</td>
                        <td>
                          <button className="btn btn-square btn-xs btn-outline" onClick={(e) => {e.preventDefault(); window.location.href="http://localhost:8080/api/items/delete/"+todo.what_to_do;}}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                ))}
              </table>
<div>
          <button className="btn btn-circle mt-20" onClick={toggle}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="currentColor" 
              className="bi bi-plus-lg" 
              viewBox="0 0 18 18">
              <path
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
            </svg>
          </button>

            {isOpen ?
              <div className="text-center mt-5 mb-5">
                 <form action="http://localhost:8080/api/items/add" method="POST" id="add-form" className= "flex items-center flex-col gap-3">
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text ml-4">Task name</span>
                              </div>
                                <input type="text" name="what_to_do" placeholder="What next?" className="input input-bordered min-w-md h-11 ml-4" required/>
                            </label> 
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text ml-4">Due date</span>
                              </div>
                                <Datepicker type="text" name="due_date" placeholder="Due date" className="input min-w-md border-none h-11"></Datepicker>
                            </label> 
                            <input type="submit" value="Add to list" className="btn mt-4"/>
                </form> 
              </div>
            : null}
            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
