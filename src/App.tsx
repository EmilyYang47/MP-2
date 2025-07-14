import IceAndFire from "./components/IceAndFire.tsx";
import styled from "styled-components";
import { useEffect, useState } from 'react'
import {Character} from "./interfaces/Characters.ts";

const ParentDiv=styled.div`
    width: 90vw;
    margin: auto;
    background-color: #f8f3ecff; 
`;

const StypedH1=styled.h1`
    font-size: calc(2px + 3vw);
    text-align: center; 
    padding: 1%
`;

export default function App() {
  // useState Hook to store Data. 
  const [data, setData] = useState<Character[]>([]); 

  // useEffect Hook for error handling and re-rendering. 
  useEffect(()=>{
    async function fetchData(): Promise<void> {
      const characters: Character[] = []; 

      // iterate over each id from range [1,100], since the https://anapioficeandfire.com/api/characters/ only provides the first few characters 
      for (let id = 1; id <= 100; id++) {
        try {
          const rawData = await fetch(`https://anapioficeandfire.com/api/characters/${id}`); 
          const character = await rawData.json(); 
          
          // only load the characters with a name field 
          if (character.name){ 
            // Create a new character object that combines all fields from the fetched character with an additional id field. 
            // "...character" is the fields from the fetched character, "id: id" is the id field.  
            // Resource: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#object-spread
            const characterObject : Character = {...character, id: id} 

            // push the Character object into characters 
            characters.push(characterObject); 
          } 
        } catch (e) { 
          console.log(`Error fetching character ${id}: `+ e); 
        } 
      }

      setData(characters); 
    } 

    fetchData()
      .then(() => console.log("Data fetched successfully")) 
      .catch((e: Error) => console.log("there was the error: " + e)); 
  }, [data.length]); 

  return (
    <>
      <ParentDiv>
        <StypedH1>Ice And Fire Characters</StypedH1>
        <IceAndFire data={data}/>
      </ParentDiv>
    </>
  )
}

