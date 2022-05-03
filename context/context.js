import React, { useState, useEffect, createContext } from 'react'

const DataContext = createContext()

const DataProvider = ({children}) => {
    // states goes here
    const [greeting, setGreeting] = useState('Hi')
    return(
        <DataContext.Provider value={{ greeting }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider }