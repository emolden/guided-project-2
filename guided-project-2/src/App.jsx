import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState(0)

  useEffect (() => {
    const fetchCharacter = async ()=> { 
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
    fetchCharacter();

  }, []
  );
  return (
    <>
      <h1>Characters</h1>
      {/* <u1>
        {characters.map((character) =>

        )}
      </u1> */}
    </>
  )
}

export default App
