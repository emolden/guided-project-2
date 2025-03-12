import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState(null)
  const [films, setFilms] = useState(null)
  const [planets, setPlanets] = useState(null)
  const [characterById, setCharacterById] = useState(null)

  useEffect (() => {
    const fetchCharacters = async ()=> { 
      try {
        const response = await fetch("http://localhost:3000/api/characters");
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setCharacters(json_response);
        console.log(json_response);
      } catch (err) {
        console.error("Error fetching characters", err);
      }

    };

    const fetchFilms = async ()=> { 
      try {
        const response = await fetch("http://localhost:3000/api/films");
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setFilms(json_response);
        console.log(json_response);
      } catch (err) {
        console.error("Error fetching films", err);
      }

    };

    const fetchPlanets = async ()=> { 
      try {
        const response = await fetch("http://localhost:3000/api/planets");
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setPlanets(json_response);
        console.log(json_response);
      } catch (err) {
        console.error("Error fetching planets", err);
      }

    };

    const fetchCharacterById = async (id)=> { 
      try {
        const response = await fetch(`http://localhost:3000/api/characters/${id}`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setCharacterById(json_response);
        console.log(json_response);
      } catch (err) {
        console.error("Error fetching character by id", err);
      }

    };


    fetchCharacters();
    fetchFilms();
    fetchPlanets();
    fetchCharacterById(1);

  }, []
  );
  return (
    <>
      <h1>Characters</h1>
      <ul>
        {
          characters.map((char) => ( <li key={char._id}>{char.name}</li>))
        }
        </ul>
    </>
  )
}

export default App
