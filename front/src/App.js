import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  let [info, setInfo] = useState({});
  let [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/allStudents')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
  }, []);

  function CreateList() {
    return students.map((student) => (
      <div key={student._id}>
      {student.name} is {student.age} years old and their favorite color is {student.color}
    </div>
  ));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target[0].value && e.target[1].value && e.target[2].value) {
      console.log('gud')
      console.log(e.target[0].value);
      console.log(e.target[1].value);
      console.log(e.target[2].value);

      fetch('http://127.0.0.1:5000/newStudent', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(info),
      }).then(res => res.json()
        .then(response => setStudents([...students, response]))
      )
    } else {
      console.log('not all inputs filled')
    }
  }

  return (
    <div className="App">
      <h1 style={{ margin: '32px 0'}}>Make People</h1>
        <form className='flex col center' onSubmit={handleSubmit}>

          <div className='form-item flex end w100'>
            <label>Name:</label>
            <input onChange={(e) => setInfo({ ...info, name: e.target.value })}
              type="text" />
          </div>

          <div className='form-item flex end w100'>
            <label>Age:</label>
            <input onChange={(e) => setInfo({ ...info, age: e.target.value })}
              type="number"/>
          </div>

          <div className='form-item flex end w100'>
            <label>Favorite Color:</label>
            <input onChange={(e) => setInfo({ ...info, color: e.target.value })}
              type="text"/>
          </div>

        <button className='submit'>Submit</button>
      </form>
      <CreateList />
    </div>
);
}

export default App;