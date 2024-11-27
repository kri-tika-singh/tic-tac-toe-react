import { useState } from "react";

export default function Player({initialname, symbol, isActive}){
    const [PlayerName, setPlayerName] = useState(initialname)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditclick(){
        setIsEditing((editing) => !editing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{PlayerName}</span>;
    // let btnCaption = 'save';

    if(isEditing){
        editablePlayerName = (
        <input type="text" required value={PlayerName} onChange={handleChange}/>
    );

    }

    return(
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditclick}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    );
}