import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FaStar } from "react-icons/fa";

// import App from './App';
import reportWebVitals from './reportWebVitals';

const people = ["Alex", "Cori", "David", "Sarah", "John"];
console.log(people[2])
// destructure array
const [, second, third] = ["Alex", "Cori", "David", "Sarah", "John"];
console.log(second)


//Part 2c Working with component trees
const createArray = (length) => [
  ...Array(length)
];

function Star({ selected = false, onSelect }) {

  return <FaStar
    color={selected ? "red" : "darkgrey"}
    onClick={onSelect}
  />
}

function StarRating({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0)
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>{selectedStars} of {totalStars}</p>
    </>
  )
}




function App() {
  //Part 2a Incorporating the useState hook
  const [status, setStatus] = useState("Not Delivered");

  //Part 2b Building a checkbox with useState
  const [checked, setChecked] = useState(false);




  return (
    <div key="div__app">

      <hr />
      <div key="div__delivered">
        <h1>The package is: {status}</h1>
        <button onClick={() => setStatus("Delivered")}>Deliver</button>
        <button onClick={() => setStatus("Not Delivered")}>Reset</button>
      </div>
      <hr />
      <div key="div__input">
        <h2>Building a checkbox with useState</h2>
        <input
          type="checkbox"
          value={checked}
          onChange={() =>
            setChecked((checked) => !checked)
          }
        />
        <p>{checked ? "Checked" : "Not Checked"}</p>
      </div>
      <hr />
      <div key="div__componentTree">
        <h2>Star Rating Component Tree</h2>
        <StarRating totalStars={4} />

      </div>


    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
