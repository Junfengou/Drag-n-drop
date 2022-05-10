import React, {useState} from 'react'
import dynamic from "next/dynamic";

const App = dynamic(import('../components/ReactDnd/App'));

function reactdnd() {
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

export default reactdnd