import React, { useState, useEffect, createContext } from 'react'
import {initialColumns} from "../assets/data"

const DataContext = createContext()

const DataProvider = ({children}) => {
    // states goes here
    const [greeting, setGreeting] = useState('Hi')
    const [columns, setColumns] = useState(initialColumns)
    const [displayCol, setDisplayCol] = useState([])
    
    return(
        <DataContext.Provider value={{ greeting, columns, setColumns, displayCol, setDisplayCol}}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider }