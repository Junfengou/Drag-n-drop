import React, { useState, useContext } from 'react'
import {DataContext} from '../context/context'
import styled from 'styled-components'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import Tree from 'react-animated-tree'
import Link from 'next/link';
import {treeData} from "../assets/tree-data"
import {Treebeard} from 'react-treebeard';
import styleData from '../assets/style-data';

function Test() {
    const { setDisplayCol, testCol, setTestCol, tree, setTree} = useContext(DataContext)
    const onDragEnd = ({ source, destination }) => {
        if (destination === undefined || destination === null) return null
        if (source.droppableId === destination.droppableId &&
            destination.index === source.index) {return null}

        const start = testCol[source.droppableId]
        const end = testCol[destination.droppableId]

        if (start === end) {
            // moving within the same col
        } else {
            const newStartList = start.list.filter(
                (_, idx) => idx !== source.index
            )
            const newStartCol = {
                id: start.id,
                list: newStartList
            }
            const newEndList = end.list
            newEndList.splice(destination.index, 0, start.list[source.index])


            // console.log(newEndList);

            // console.log(newEndList?.at(-1));
            const newEndCol = {
                id: end.id,
                list: newEndList
            }

            if(newEndCol.id == "OrgTree" && tree == null) {
                setTree(newEndList?.at(-1));
                // console.log("hi");
            }
            if(tree != null) { // tree is populated with something
                if(newEndCol.id == 'OrgTree') addToTree(newEndList?.at(-1), tree, setTree)
                else console.log(newEndList);
            }
            setTestCol(state => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
            }))

        }
    };

    const addToTree = (item, tree, setTree) => {
        if(tree.branch != null) {
            let incomingItem = item
            addToTree(incomingItem, tree.branch, setTree);
        }
        else {
            if(tree == null) return;
            else {
                tree.branch = item;
                setTree(tree);
            }
        }
        // if(tree.branch == null) tree.branch = item;
        // console.log(tree.branch);
        
    }
  return (
    <>
        <Link href="/">
            <a style={{color: 'blue'}}>{`<-`} Back home</a>
        </Link>
        <h1 style={{marginLeft: 10}}>Test</h1>
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <DropBoxrapper>
                    {Object.values(testCol).map(col => (
                        <Column col={col} key={col.id} />
                    ))}
                </DropBoxrapper>
            </DragDropContext>
            <TreeComp item={tree}/>
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
                        {col.list.map((obj, index) => (
                            <Item key={obj.name} obj={obj} index={index} id={col.id} />
                        ))}
                        {provided.placeholder}
                    </ColumnWrapperContainer>
                </ColumnWrapper>
            )}
        </Droppable>
    )
}

const Item = ({obj, index, id}) => {
    return(
        <Draggable draggableId={obj.name} index={index}>
            {provided => (
                <ItemWrapper index={id == 'OrgTree' ? index : 0.5}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div><FontAwesomeIcon icon={faGripVertical} style={{color: 'rgba(122, 134, 135, 0.5)', fontSize: 15}} /></div>
                    <div style={{width: '90%'}} >{obj.name}</div>
                </ItemWrapper>
            )}
        </Draggable>
    )
}

const TreeComp = ({item}) => {
    console.log(item);
    const [data, setData] = useState(treeData);
    const [cursor, setCursor] = useState(false);

    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data))
    }
    return(
        <ColumnWrapper>
            <ColumnWrapperTitle>
                <h4>Preview</h4>
            </ColumnWrapperTitle>
            <PreviewColumnContainer>
                {/* {
                    item != null && (
                        <Tree content={item?.name} style={{marginLeft: 20, marginTop: 10}} >
                            <Tree content={item?.data[0]}  />
                            <Tree content={item?.data[1]} >
                                {item?.branch?.data?.map((obj, i) => (
                                    <Tree content={obj} key={i}  /> 
                                ) )}
                            </Tree>
                        </Tree>
                    )
                } */}
                <Treebeard data={data} onToggle={onToggle} style={styleData} />
            </PreviewColumnContainer>
        </ColumnWrapper>
    )
}

const treeStyle = {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red'
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
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    -webkit-box-shadow: 10px 11px 9px -7px rgba(0,0,0,0.35); 
    box-shadow: 10px 11px 9px -7px rgba(0,0,0,0.35);    

`

export default Test