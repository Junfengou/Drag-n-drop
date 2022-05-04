import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import {DataContext} from '../context/context'

function MultiDragnDrop() { 
const { columns, setColumns, displayCol ,setDisplayCol} = useContext(DataContext)
const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null


    // Set start and end variables
    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_, idx) => idx !== source.index
      )

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      }

      // Update the state
      setColumns(state => ({ ...state, [newCol.id]: newCol }))
      if(start.id == 'OrgTree'){
        setDisplayCol(newList);
      }

      return null
    }
    else {
        // If start is different from end, we need to update multiple columns
        // Filter the start list like before
        const newStartList = start.list.filter(
            (_, idx) => idx !== source.index
        )
        const newStartCol = {
            id: start.id,
            list: newStartList
        }
        
        // Make a new end list array
        const newEndList = end.list
        newEndList.splice(destination.index, 0, start.list[source.index])

        const newEndCol = {
            id: end.id,
            list: newEndList
        }
        // Update the state
        setColumns(state => ({
            ...state,
            [newStartCol.id]: newStartCol,
            [newEndCol.id]: newEndCol
        }))
        /* 
            if the start column is col: 1 then set the display col to newEndList
            else set the display col to newStartList
        */
        setDisplayCol(newStartCol.id == 'Attributes' ? newEndList: newStartList);
        return null
    }
  }

  return (
    <>
        <Link href="/">
            <a style={{color: 'blue'}}>{`<-`} Back home</a>
        </Link>
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <DropBoxrapper>
                    {Object.values(columns).map(col => (
                        <Column col={col} key={col.id} />
                    ))}
                </DropBoxrapper>
            </DragDropContext>
            <DisplayColumn/> 
        </Wrapper>
    </>
  )
}

const Column = ({ col }) => {
    return(
        <Droppable droppableId={col.id}>
            {provided => (
                <ColumnWrapper>
                    <ColumnWrapperTitle>
                        <h4>{col.id == 'OrgTree' ? 'Org Tree Structure' : col.id}</h4>
                    </ColumnWrapperTitle>
                    
                    <ColumnWrapperContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef} >
                        {col.list.map((text, index) => (
                            <Item key={text} text={text} index={index} id={col.id} />
                        ))}
                        {provided.placeholder}
                    </ColumnWrapperContainer>
                </ColumnWrapper>
            )}
        </Droppable>
    )
}

const Item = ({text, index, id}) => {
    return(
        <Draggable draggableId={text} index={index}>
            {provided => (
                <ItemWrapper index={id == 'OrgTree' ? index : 0.5}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div><FontAwesomeIcon icon={faGripVertical} style={{color: 'rgba(122, 134, 135, 0.5)', fontSize: 15}} /></div>
                    <div style={{width: '90%'}} >{text}</div>
                </ItemWrapper>
            )}
        </Draggable>
    )
}

const DisplayColumn = () => {
    const { displayCol } = useContext(DataContext)
    return (
        <ColumnWrapper>
            <ColumnWrapperTitle>
                <h4>Preview</h4>
            </ColumnWrapperTitle>
            <PreviewColumnContainer>
                {displayCol?.map((item, i) => (
                    <p key={i}>{item}</p>
                ))}
            </PreviewColumnContainer>
        </ColumnWrapper>
    )
}

const Wrapper = styled.div`
    /* border: solid 2px blue; */
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-items: center;
    align-items: center;
`

const DropBoxrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 1.6rem auto;
    width: 100%;
    height: 100%;
    /* border: solid 2px red; */
    padding: 0 1rem;

`

const ColumnWrapper = styled.div`
     border: solid 1px rgba(122, 134, 135, 0.2);
     border-radius: 10px;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     width: 20rem;
     height: 50vh;
`
const ColumnWrapperTitle = styled.div`
    height: 15%;
    width: 100%;

    h4 {
        padding-left: 1rem;
    }
`

const PreviewColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 85%;
    overflow-y: scroll;

    p {
        margin: 0.5rem 1rem;
    }
`

const ColumnWrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* min-height: 7.5rem; */
    /* border: solid 2px pink; */
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 0.5rem 1rem;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
`

const ItemWrapper = styled.div`
    border: solid 1px rgba(122, 134, 135, 0.5);
    /* border: solid 2px red; */
    padding: 0.5rem;
    margin-left: ${props => props.index}rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;

`
// font-size: ${props => props.fontSize}px;
// Refer to this guide
// https://dev.to/imjoshellis/codealong-multi-column-drag-and-drop-in-react-3781

export default MultiDragnDrop