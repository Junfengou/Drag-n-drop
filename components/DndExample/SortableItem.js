import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components"

export function Item(props) {
  const { id } = props;

  return <ItemStyle >{id}</ItemStyle>;
}

export function BackdropItem(props) {
    const { id } = props;
    return <BackdropItemStyle >{id}</BackdropItemStyle>;
}

export default function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    return (
        <SortableItemStyle ref={setNodeRef} {...attributes} {...listeners} transition={transition} transform={transform} >
            <Item id={props.id} />
        </SortableItemStyle>
    );
}


const ItemStyle = styled.div`
    width: 10rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px pink;
    margin: 10px 0;
    background-color: white;
`;

const BackdropItemStyle = styled.div`
    width: 10rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px red;
    margin: 10px 0;
    background-color: white;
`

const SortableItemStyle = styled.div`
    transform: ${props => CSS.Transform.toString(props.transform)};
    transition: ${props => props.transition};
`