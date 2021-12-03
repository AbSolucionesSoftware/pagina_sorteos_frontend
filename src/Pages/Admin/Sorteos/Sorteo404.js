import React from 'react';
import Url from './no-found.svg';

export default function Sorteo404() {
    return (
        <div>
            <img src={Url} />
            <p style={{textAlign: "center", fontSize: "50px", marginTop: "-10px"}} >Parece que no tienes un sorteo activo.</p>
        </div>
    )
}
