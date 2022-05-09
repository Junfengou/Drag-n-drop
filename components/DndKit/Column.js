import React from 'react'
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import styled from 'styled-components'
import SortableItem from './SortableItem';

function Column(props) {
    const { id, items } = props;
    const { setNodeRef } = useDroppable({
      id
    });
  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        <ColumnWrapper ref={setNodeRef}>
            {
                items.map((id) => (
                    <SortableItem key={id} id={id} />
                ))
            }
        </ColumnWrapper>
    </SortableContext>
  )
}

export default Column

const ColumnWrapper = styled.div`
     border: solid 1px rgba(122, 134, 135, 0.2);
     /* border: solid 2px red; */
     border-radius: 10px;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     width: 20rem;
     height: 50vh;
     margin: 0 1rem;
`
const ColumnWrapperTitle = styled.div`
    height: 15%;
    width: 100%;

    h4 {
        padding-left: 1rem;
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