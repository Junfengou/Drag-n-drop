import React from 'react'
import dynamic from "next/dynamic";

const Test = dynamic(import('../components/Test'));

function proto() {
    const [winReady, setwinReady] = React.useState(false);

    React.useEffect(() => {
        setwinReady(true);
    }, []);
  return (
    <>
        {winReady ? <Test /> : null}
    </>
  )
}

export default proto