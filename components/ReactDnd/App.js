import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { column_name, tasks } from "../../assets/reactdnd-data";
import styled from 'styled-components'

const MovableItem = ({name, index, currentColumnName, moveCardHandler, setItems}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((item) => {
        return {
          ...item,
          column: item.name === currentItem.name ? columnName : item.column
        }
      })
    })
  }

  const ref = useRef(null);
  
  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item, monitor) {
      if(!ref.current) {return;}
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if(dragIndex === hoverIndex) {return;}
      // Determine rectangle screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.buttom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      /*
        Only perform the move when the mouse has crossed half of the items height
        When dragging downwards, only move when the cursor is below 50%
        When dragging upwards, only move when the cursor is above 50%
      */
      // Dragging downwards
     if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {return;}
      // Dragging upwards
     if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {return;}

     // Time to actually perform the action
     moveCardHandler(dragIndex, hoverIndex);
     /*
      Note: we are mutating the monitor item here!
      Generally it's better to avoid mutations
      but it's good here for the sake of performance
      to avoid expensive index searches
     */
    item.index = hoverIndex;

    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, name, currentColumnName, type: "Our first type"},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if(dropResult) {
        const { name } = dropResult;
        const {DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE} = column_name;
        switch(name) {
          case IN_PROGRESS: 
            changeItemColumn(item, IN_PROGRESS);
            break;
          case AWAITING_REVIEW: 
            changeItemColumn(item, AWAITING_REVIEW);
            break;
          case DONE: 
            changeItemColumn(item, DONE);
            break;
          case DO_IT: 
            changeItemColumn(item, DO_IT);
            break;
        }
      }
    },
    collect: (monitor => ({
      isDragging: monitor.isDragging()
    })),
    type: "Box"
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref))

  return(
    <MovableItemStyle ref={ref} opacity={opacity}>
      {name}
    </MovableItemStyle>
  )
}

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = column_name;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === DO_IT && title === IN_PROGRESS) ||
        (currentColumnName === IN_PROGRESS &&
          (title === DO_IT || title === AWAITING_REVIEW)) ||
        (currentColumnName === AWAITING_REVIEW &&
          (title === IN_PROGRESS || title === DONE)) ||
        (currentColumnName === DONE && title === AWAITING_REVIEW)
      );
    }
  });
  const getBackgroundColor = () => {
    if(isOver) {
      if(canDrop) {
        return "rgb(188, 251, 255)"
      } else if (!canDrop) {
        return "rgb(255, 188, 188)"
      }
    }
    else {
      return "";
    }
  }
  return(
    <ColumnStyle ref={drop} className={className} background={getBackgroundColor()}>
      <p>{title}</p>
      {children}
    </ColumnStyle>
  )

}

function App() {
  const [items, setItems] = useState(tasks);

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    if(dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // Remove item by hoverIndex and put dragItem instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        
        // Remove item by dragIndex and put prevItem instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0])
        return coppiedStateArray;
      })
    }
  }

  const returnItemsForColumn = (columnName) => {
    return items.filter((item) => item.column === columnName).map((item, index) => (
      <MovableItem
        key={item.id}
        name={item.name}
        currentColumnName={item.column}
        setItems={setItems}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ))
  }

  const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = column_name;
  return (
    <AppWrapper>
      <DndProvider backend={HTML5Backend}>
        <Column title={DO_IT}>
          {returnItemsForColumn(DO_IT)}
        </Column>

        <Column title={IN_PROGRESS}>
          {returnItemsForColumn(IN_PROGRESS)}
        </Column>

        {/* <Column title={AWAITING_REVIEW}>
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>

        <Column title={DONE}>
          {returnItemsForColumn(DONE)}
        </Column> */}
      </DndProvider>
    </AppWrapper>
  )
}

export default App


const MovableItemStyle = styled.div`
  border-radius: 5px;
  background-color: '#fafdff';
  height: 100px;
  width: 140px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  /* opacity: ${props => props.opacity}; */
  border: solid 2px red;
`

const ColumnStyle = styled.div`
  height: max-content;
  min-height: 100px;
  width: 160px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  border: 2px solid '#7d7d7d';
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* border: solid 2px red; */
`

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`