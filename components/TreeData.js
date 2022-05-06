import React, { useState } from 'react'
import {treeData} from "../assets/tree-data"
import {Treebeard} from 'react-treebeard';
import styleData from '../assets/style-data';
// import { styleData } from '../assets/style-data';

function TreeData() {
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
  return (
    <div>
        <Treebeard data={data} onToggle={onToggle} style={styleData} />
    </div>
  )
}



export default TreeData

// Tree library
// https://github.com/iannbing/react-simple-tree-menu?ref=morioh.com&utm_source=morioh.com