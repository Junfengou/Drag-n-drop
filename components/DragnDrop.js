import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'
import { dummyData } from '../assets/dummy';

function DragnDrop() {
const [items, setItems] = useState(dummyData)

function handleOnDragEnd(result) {
    if (!result.destination) return;

    const ItemArr = Array.from(items);
    const [reorderedItem] = ItemArr.splice(result.source.index, 1);
    ItemArr.splice(result.destination.index, 0, reorderedItem);

    setItems(ItemArr);
}
return(
    <Wrapper>
      <header>
        <h1>Drag and drop</h1>
        <DragDropContext onDragEnd={handleOnDragEnd} >
          <Droppable droppableId="items" style={cardStyle.container}>
            {(provided) => (
              <Ul {...provided.droppableProps} ref={provided.innerRef}>
                {items.map(({Id, Name}, index) => {
                  return (
                    <Draggable key={Id} draggableId={Id} index={index} style={cardStyle.container}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                          <p style={cardStyle.container}>
                            { Name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </Ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </Wrapper>
)
}

export default DragnDrop


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Ul = styled.ul`
    border: solid 2px blue;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    li {
        /* border: solid 2px red; */
        list-style-type: none;
        width: 100%;
        text-align: center;
        margin-bottom: 0.2rem;
        margin-top: 0.2rem;
        margin-right: 2rem;
    }
`

const cardStyle = {
    container: {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        padding: '1rem',
        color: 'purple'
    }
}
