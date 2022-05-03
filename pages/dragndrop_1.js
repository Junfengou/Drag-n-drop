import React from 'react'
import dynamic from "next/dynamic";

// https://github.com/atlassian/react-beautiful-dnd/issues/1756
// saurabhburade's comment

// Make sure the DOM and the window is loaded before loading the draggable component
const Draggable = dynamic(import('../components/DragnDrop'));
function DragnDrop() {
  const [winReady, setwinReady] = React.useState(false);

  React.useEffect(() => {
      setwinReady(true);
  }, []);

  return (
    <div>
      {winReady ? <Draggable /> : null}
    </div>
  )
}

export default DragnDrop