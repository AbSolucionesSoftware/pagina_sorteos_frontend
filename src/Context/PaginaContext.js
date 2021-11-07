import React, { createContext, useState } from 'react';

export const PaginaContext = createContext();

export const PaginaProvider = ({ children }) => {

    const [ datos, setDatos ] = useState([]);
    const [ datosSorteo, setDatosSorteo ] = useState();
    const [ reload, setReload ] = useState(false);
    const [ boletos_seleccionados, setBoletosSeleccionados ] = useState([])
    const [ loadingSorteo, setLoadingsorteo ] = useState(false);
    const [ finalizado, setFinalizado ] = useState(false);

	return (
		<PaginaContext.Provider value={
            { 
                datos, 
                setDatos,
                reload, 
                setReload,
                datosSorteo, 
                setDatosSorteo,
                boletos_seleccionados, 
                setBoletosSeleccionados,
                loadingSorteo, setLoadingsorteo,
                finalizado, setFinalizado
            }
        }>
			{children}
		</PaginaContext.Provider>
	);
};
