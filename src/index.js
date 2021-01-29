import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Part 5e custom fetch component
import { useFetch } from "./useFetch";

import App from "./App";

// import App from './App';
import reportWebVitals from './reportWebVitals';



//Part 5b Placing Data in Context
export const TreesContext = createContext();

const trees = [
  { id: "1", type: "Maple" },
  { id: "2", type: "Oak" },
  { id: "3", type: "Family" },
  { id: "4", type: "Component" }
]

//Part 5d Creating a custom Hook with context
const CarsContext = createContext();
export const useCars = () => useContext(CarsContext)

const cars = [
  { id: "1", type: "Honda" },
  { id: "2", type: "Toyota" },
  { id: "3", type: "Tesla" },
  { id: "4", type: "General Motors" }
]

function FetchApp({ login }) {
  //Part 5e Data Fetching with a Fetch
  //Three possible states:
  //If the data isn't available but is loading...
  //If we get the data...
  //If there's an error...

  const { loading, data, error } = useFetch(`https://api.github.com/users/${login}`);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  return (
    <div>
      <h2>Building a fetch component</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <img
        src={data.avatar_url}
        alt={data.login}
      />
      <div>
        <h2>{data.login}</h2>
        {data.name && <p>{data.name}</p>}
      </div>
    </div>
  );
}



ReactDOM.render(
  // <React.StrictMode>
  //Part 5b Placing Data in Context with Provider
  <CarsContext.Provider value={{ cars }}>
    <TreesContext.Provider value={{ trees }}>
      <App />
      <FetchApp login="davidbrucetn" />
    </TreesContext.Provider>
  </CarsContext.Provider>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
