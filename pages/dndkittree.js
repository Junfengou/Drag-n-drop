import React from 'react'
import dynamic from "next/dynamic";
// import App from '../components/DndKit/App'
const App = dynamic(import('../components/DndKit/App'));


function dndkittree() {
  const [winReady, setwinReady] = React.useState(false);

  React.useEffect(() => {
      setwinReady(true);
  }, []);

  return (
    <>
        {winReady ? <App /> : null}
    </>
  )
}

export default dndkittree