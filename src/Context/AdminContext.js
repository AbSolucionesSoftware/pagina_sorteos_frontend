import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const [ datos, setDatos ] = useState([]);
    const [ reload, setReload ] = useState(false);
    const [ alert, setAlert ] = useState(false);

	return (
		<AdminContext.Provider value={
            { 
                datos, 
                setDatos,
                reload, 
                setReload,
                alert, 
                setAlert
            }
        }>
			{children}
		</AdminContext.Provider>
	);
};
