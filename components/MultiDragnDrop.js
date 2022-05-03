import React, {useState} from 'react'
import styled from 'styled-components'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

function MultiDragnDrop() { // App.tsx
const initialColumns = {
    todo: {
      id: 'todo',
      list: ['item 1', 'item 2', 'item 3']
    },
    doing: {
      id: 'doing',
      list: []
    },
    done: {
      id: 'done',
      list: []
    }
  }
const [columns, setColumns] = useState(initialColumns)
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
        return null
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
        {Object.values(columns).map(col => (
            <Column col={col} key={col.id} />
        ))}
        </Wrapper>
    </DragDropContext>
  )
}

export default MultiDragnDrop

const Column = ({ col: { list, id } }) => {
    return(
        <Droppable droppableId={id}>
      {provided => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          >
          <h2>{id}</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '120px'
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <Item key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
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