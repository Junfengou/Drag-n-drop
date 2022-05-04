import React, { useState, useEffect, createContext } from 'react'
import {initialColumns} from "../assets/dropbox-data"

const DataContext = createContext()

const DataProvider = ({children}) => {
    // states goes here
    const [columns, setColumns] = useState(initialColumns)
    const [displayCol, setDisplayCol] = useState([])
    const [orgTreeStyle, setOrgTreeStyle] = useState(0);
    
    return(
        <DataContext.Provider value={{columns, setColumns, 
            displayCol, setDisplayCol,
            orgTreeStyle, setOrgTreeStyle}}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider }