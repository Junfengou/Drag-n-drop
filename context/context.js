import React, { useState, useEffect, createContext } from 'react'
import {initialColumns} from "../assets/dropbox-data"
import { testColumn } from '../assets/test-data'
import { data } from "../assets/dndkit-data"


const DataContext = createContext()

const DataProvider = ({children}) => {
    // Drag and drop page
    const [columns, setColumns] = useState(initialColumns)
    const [displayCol, setDisplayCol] = useState([])
    const [orgTreeStyle, setOrgTreeStyle] = useState(0);

    // ---- Test page
    const [testCol, setTestCol] = useState(testColumn)
    const [tree, setTree] = useState(null)

    // Dnd kit
    const [items, setItems] = useState(data);
    const [activeId, setActiveId] = useState();

    
    return(
        <DataContext.Provider value={{columns, setColumns, 
            displayCol, setDisplayCol,
            orgTreeStyle, setOrgTreeStyle,
            testCol, setTestCol,
            tree, setTree,
            items, setItems,
            activeId, setActiveId
            }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider }