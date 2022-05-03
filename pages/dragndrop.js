import React from 'react'
import dynamic from "next/dynamic";

// https://github.com/atlassian/react-beautiful-dnd/issues/1756
// saurabhburade's comment

// Make sure the DOM and the window is loaded before loading the draggable component

const Draggable = dynamic(import('../components/MultiDragnDrop'));
function dragndrop_2() {
    const [winReady, setwinReady] = React.useState(false);

    React.useEffect(() => {
        setwinReady(true);
    }, []);
  return (
    <>
        {winReady ? <Draggable /> : null}
    </>
  )
}

export default dragndrop_2

