import React, { createContext, useState } from 'react';

export const PaginaContext = createContext();

export const PaginaProvider = ({ children }) => {

    const [ datos, setDatos ] = useState([]);
    const [ datosSorteo, setDatosSorteo ] = useState([]);
    const [ reload, setReload ] = useState(false);

	return (
		<PaginaContext.Provider value={
            { 
                datos, 
                setDatos,
                reload, 
                setReload,
                datosSorteo, 
                setDatosSorteo
            }
        }>
			{children}
		</PaginaContext.Provider>
	);
};
