import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';
// import logo from './logo.svg';
import './App.css';
//Part 5a Reusing form logic with custom hooks
import { useInput } from "./useInput";
import { FaStar } from "react-icons/fa";
//Part 5c Retrieving data with useContext
import { TreesContext } from '.';
//Part 5c custom hook with context
import { useCars } from "./"



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

//destructure props to props.name -> name
function App() {

  //Part 5c Retrieving Data with useContext
  const { trees } = useContext(TreesContext);

  //Part 5d Creating a custom Hook with context
  const { cars } = useCars();

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

  //Part 4a Handling complex state with useReducer
  // useReducer((args) => function to return new state), initial state
  const [number, setNumber] = useReducer(
    (number, newNumber) => number + newNumber,
    0
  );

  //Part 4b Refactoring useState to useReducer 
  const [checkedur, toggle] = useReducer(
    (checked) => !checked,
    false
  );

  //Part 4c Dispatching actions with useReducer
  const initialState = {
    message: "hi"
  }

  function reducer(state, action) {
    switch (action.type) {
      case "yell":
        return {
          message: `HEY! I just said ${state.message}`
        };
      case "whisper":
        return {
          message: `excuse me I just said ${state.message}`
        };
    }
  }
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  //Part 4c Managing form inputs with useRef
  const sound = useRef();
  const color = useRef();

  const submit = (evt) => {
    evt.preventDefault();
    const soundVal = sound.current.value;
    const colorVal = color.current.value;
    alert(`${soundVal} sounds like ${colorVal}`);
    sound.current.value = "";
    color.current.value = "";
  }

  //Part 4c Managing controlled components with useState
  const [soundus, setSoundus] = useState("");
  const [colorus, setColorus] = useState("#000000");
  const submitus = (e) => {
    e.preventDefault();
    alert(`${soundus} sounds like ${colorus}`);
    setSoundus("");
    setColorus("#000000");
  }

  //Part 5a Reusing form logic with custom hooks
  // const [soundus, setSoundus] = useState("");
  // const [colorus, setColorus] = useState("#000000");
  // Refactor to >
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");

  const submitui = (e) => {
    e.preventDefault();
    alert(`${titleProps.value} sounds like ${colorProps.value}`);
    resetTitle();
    resetColor();
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
      <hr />
      <div key="div__useReducer__complexState">
        <h2>useReducer handling complex state</h2>
        <h2 onClick={() => setNumber(1)}>{number}</h2>
      </div>
      <hr />
      <div key="div__useReducer__from-useState">
        <h2>Building a checkbox with useReducer</h2>
        <input
          type="checkbox"
          value={checkedur}
          onChange={toggle}
        />
        <p>{checkedur ? "Checked" : "Not Checked"}</p>
      </div>
      <hr />
      <div key="div__useReducer__dispatchingActions">
        <h2>Dispatching actions with useReducer</h2>
        <p>Message: {state.message}</p>
        <button onClick={() => dispatch({ type: "yell" })}>Yell</button>
        <button onClick={() => dispatch({ type: "whisper" })}>Whisper</button>
      </div>
      <hr />
      <div key="div__useRef__mgmtOfFormInputs">
        <h2>Managing Form Inputs with useRef</h2>
        <form onSubmit={submit}>
          <input
            ref={sound}
            type="text"
            placeholder="Sound..."
          />
          <input
            ref={color}
            type="color"
          />
          <button>Add</button>
        </form>

      </div>
      <hr />
      <div key="div__useState__mgmtOfControlledComponents">
        <h2>Managing Form Inputs with useRef</h2>
        <form onSubmit={submitus}>
          <input
            value={soundus}
            type="text"
            placeholder="Sound..."
            onChange={(e) => setSoundus(e.target.value)}
          />
          <input
            value={colorus}
            type="color"
            onChange={(e) => setColorus(e.target.value)}
          />
          <button>Add</button>
        </form>

      </div>
      <hr />

      <div key="div__useInput__customHook">
        <h2>Reusing Form Logic with Custom Hooks</h2>
        <form onSubmit={submitui}>
          <input
            {...titleProps}
            type="text"
            placeholder="Sound..."
          />
          <input
            {...colorProps}
            type="color"
          />
          <button>Add</button>
        </form>

      </div>
      <hr />

      <div key="div__dataContext">
        <h2>Placing data and retrieving data with useContext</h2>
        <h3>Trees I've Heard Of</h3>
        <ul>
          {trees.map((tree) => (
            <li key={tree.id}>{tree.type}</li>
          ))}
        </ul>


      </div>
      <hr />

      <div key="div__customHookWithContext">
        <h2>Retrieving data with a custom Hook and Context</h2>
        <h3>Cars I've Heard Of</h3>
        <ul>
          {cars.map((car) => (
            <li key={car.id}>{car.type}</li>
          ))}
        </ul>


      </div>
      <hr />

    </div>
  )
}

export default App;
