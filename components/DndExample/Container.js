import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import styled from 'styled-components'
import SortableItem from "./SortableItem";

function Container(props) {
  const { id, items } = props;
  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <ContainerStyle ref={setNodeRef}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </ContainerStyle>
    </SortableContext>
  );
}

const ContainerStyle = styled.div`
    background-color: '#dadada';
    padding: 0 10;
    margin: 0 10;
    border: solid 2px blue;
    /* flex: 1; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50%;
    width: 50%;
`

export default Container;