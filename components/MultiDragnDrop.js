import React, {useState} from 'react'
import styled from 'styled-components'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

function MultiDragnDrop() { // App.tsx
const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3'])

const onDragEnd = ({destination, source}) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (destination.index === source.index) return null

    // Move the item within the list
    // Start by making a new list without the dragged item
    const newList = list.filter((_, idx) => idx !== source.index)

    // Then insert the item at the right location
    newList.splice(destination.index, 0, list[source.index])

    // Update the list
    setList(newList)
}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
            <Column list={list} />
        </Wrapper>
    </DragDropContext>
  )
}

export default MultiDragnDrop

const Column = ({list}) => {
    return(
        <Droppable droppableId='col-1'>
            {provided => (
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                {list.map((text, index) => (
                    <Item key={text} text={text} index={index} />
                ))}
                {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

const Item = ({text, index}) => {
    return(
        <Draggable draggableId={text} index={index}>
            {provided => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                {text}
                </div>
            )}
        </Draggable>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 1.6rem auto;
    width: 80px;
    gap: 8px;

`