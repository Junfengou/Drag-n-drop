import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components"


export default function SortableItem(props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: props.id});
  return (
    <SortableItemStyle ref={setNodeRef} {...attributes} {...listeners} transition={transition} transform={transform}>
        <Item id={props.id} />
    </SortableItemStyle>
  )
}

export const Item = (props) => {
    const { id } = props;
    return(
        <ItemWrapper>{id}</ItemWrapper>
    )
}

const SortableItemStyle = styled.div`
    transform: ${props => CSS.Transform.toString(props.transform)};
    transition: ${props => props.transition};
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
    min-width: 5rem;
`