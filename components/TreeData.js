import React from 'react'
import {treeData} from "../assets/tree-data"
import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
// import default minimal styling or your own styling
import '../node_modules/react-simple-tree-menu/dist/main.css';

function TreeData() {
    console.log(treeData);
  return (
    <div>
        <h1>Spicy Tree</h1>
        {/* <TreeMenu data={treeData} /> */}
        <TreeMenu data={treeData}>
            {({ search, items }) => (
                <ul>
                    {items.map(({key, ...props}) => (
                    <ItemComponent key={key} {...props} />
                    ))}
                </ul>
            )}
        </TreeMenu>
    </div>
  )
}


export default TreeData

// Tree library
// https://github.com/iannbing/react-simple-tree-menu?ref=morioh.com&utm_source=morioh.com