import styled from "styled-components"; 
import {Character} from "../interfaces/Characters.ts"; 

const AllCharsDiv = styled.div`
    display: flex; 
    flex-flow: row wrap; 
    justify-content: space-evenly; 
    background-color: bisque; 
`; 

const SingleCharDiv = styled.div<{culture: string}> `
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    max-width: 30%;
    padding: 2%;
    margin: 1%; 
    background-color: ${(props)=>(props.culture === "Westeros" ? 'darkorange' : (props.culture === "Valyrian" ? '#E3F1FF' 
                                                                            : (props.culture === "Stormlands" ? '#9704b4ff' 
                                                                            : (props.culture === "Ironborn" ? '#f3cad4ff' 
                                                                            : (props.culture === "Andal" ? '#7c1100ff' 
                                                                            : (props.culture === "Northmen" ? '#feea69ff' 
                                                                            : 'black'))))))};
    color: ${(props) => (props.culture === "Westeros" ? 'black' : (props.culture === "Valyrian" ? '#0061A2' 
                                                                : (props.culture === "Stormlands" ? '#fbe1f7ff' 
                                                                : (props.culture === "Ironborn" ? '#84001fff' 
                                                                : (props.culture === "Andal" ? '#f5e2dfff' 
                                                                : (props.culture === "Northmen" ? '#b82508ff' 
                                                                : 'white'))))))}; 
    
    border: 3px darkred solid;
    font: italic small-caps bold calc(2px + 1vw);
    text-align: center; 
`

export default function IceAndFire(props: {data:Character[]}){
    return (
        <AllCharsDiv>
            {
                props.data.map((char: Character) => 
                    <SingleCharDiv key={char.id} culture={char.culture}>
                        <h1>{char.name}</h1>
                        <p>{char.gender}</p>
                        <p>{char.culture ? char.culture : "No Culture"}</p>
                    </SingleCharDiv> 
                )
            }
        </AllCharsDiv>
    )
}