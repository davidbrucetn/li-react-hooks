import React, { useEffect, useState } from 'react';
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

  //Part 3a useEffect
  const [name, setName] = useState("Cori");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    document.title = `Celebrate ${name}`;
  }, [name]);

  useEffect(() => {
    console.log(`The user is: ${admin ? "Admin" : "Not Admin"}`);
  }, [admin])

  //Part 3c fetching with useEffect
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users`)
      .then((response) => response.json())
      .then(setData);
  }, [])

  function GetAPIdata() {
    if (data) {
      return (
        <div>
          <ul>
            {data.map((user) => (
              <li key={user.id}>{user.login}</li>
            ))}
          </ul>
          <button onClick={() => setData([])}>Remove Data</button>
        </div>
      )
    } else {
      return (
        <p>No Users</p>
      )
    }
  }

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
      <hr />
      <div key="div__useEffect__dependencyArray">
        <section>
          <h2>Dependency Array and useEffect</h2>
          <p>Congratulations {name}!</p>
          <button onClick={() => setName("Alex")}>Change Winner</button>
          <p>{admin ? "Logged In" : "Not Logged In"}</p>
          <button onClick={() => setAdmin(true)}>Log In</button>
        </section>
      </div>
      <hr />
      <div key="div__useEffect__fetch">
        <h2>useEffect Fetch</h2>
        <GetAPIdata />
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
