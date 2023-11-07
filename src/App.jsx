import { useEffect, useState } from "react";
import { fetchPeople, fetchPerson } from "./fetchers";

const App = () => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);
  const [id, setId] = useState(null);

  // empty dependency list, runs only once.
  useEffect(() => {
    console.log("fetching People");
    const fetch = async () => {
      setPeople(await fetchPeople());
    };
    fetch();
  }, []);

  // dependency list with one item, runs whenever that value changes.
  useEffect(() => {
    console.log("fetching Person");
    const fetch = async () => {
      setPerson(await fetchPerson(id));
    };
    fetch();
    return () => {
      console.log("cleaning up the person effect");
      setPerson(null);
    };
  }, [id]);

  useEffect(() => {
    console.log("rendering..");
  });

  return (
    <div className="App">
      <h1>React Hooks Exercise Starter</h1>

      {people.map((person) => (
        <button key={person.id} onClick={() => setId(person.id)}>
          {person.name}
        </button>
      ))}
      {person && (
        <div>
          <h2>{person.name}</h2>
          <p>Age: {person.age}</p>
          <p>Hobbies: {person.hobbies.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default App;
