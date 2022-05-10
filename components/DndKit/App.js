import React, { useState, useEffect, useContext } from 'react'
import styled from "styled-components"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  closestCenter,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from './Column';
import { Item } from './SortableItem';
import {DataContext} from '../../context/context'


function App() {
  const { items, setItems, activeId ,setActiveId} = useContext(DataContext)

  const findColumn = (id) => {
    if(id in items) return id;
    return Object.keys(items).find((key) => items[key].includes(id))
  }

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  }

  // Drag over and allow for swap index
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findColumn(id);
    const overContainer = findColumn(overId);

    if ( !activeContainer || !overContainer || activeContainer !== overContainer) return;
    
    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    console.log(activeIndex);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }
    setActiveId(null)
  }

  // Drag over but only allow to place the item towards the end
  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findColumn(id);
    const overContainer = findColumn(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 
        //   && draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <AppWrapper>
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
      >
        <Column id="root" items={items.root} />
        <Column id="container1" items={items.container1} />
        <DragOverlay className="my-drag-overlay" style={{color: 'red'}}>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </AppWrapper>
  )
}

export default App

const AppWrapper = styled.div`
  /* border: solid 2px red; */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`