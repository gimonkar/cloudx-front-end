import React, { useEffect, useState } from "react";

const REACT_APP_BASE_URL="http://43.205.119.20:8080"

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [desinition, setDesinition] = useState("");
  const [yearOfExperience, setYearOfExperience] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);



  const fetchEmployees = () => {
    fetch(`${REACT_APP_BASE_URL}/api/show-all-emp`)
      .then(res => res.json())
      .then(data => setEmployees(data));
  };

  const addEmployee = (e) => {
    e.preventDefault();

    fetch(`${REACT_APP_BASE_URL}/api/new-emp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, desinition, yearOfExperience })
    }).then(() => {
      fetchEmployees();
      setName("");
      setDesinition("");
      setYearOfExperience("");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Employee</h2>
      <form onSubmit={addEmployee}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/><br/>
        <input placeholder="Desinition" value={desinition} onChange={e => setDesinition(e.target.value)} /><br/><br/>
        <input type="number" placeholder="Experience" value={yearOfExperience} onChange={e => setYearOfExperience(e.target.value)} /><br/><br/>
        <button type="submit">Add</button>
      </form>

      <h2>Employee List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Desinition</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.desinition}</td>
              <td>{emp.yearOfExperience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
