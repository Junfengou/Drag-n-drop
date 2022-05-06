import React from 'react'
// import TreeData from '../components/TreeData'
import Link from 'next/link';
import dynamic from "next/dynamic";
const TreeData = dynamic(import('../components/TreeData'));

function tree() {
  const [winReady, setwinReady] = React.useState(false);

  React.useEffect(() => {
      setwinReady(true);
  }, []);
  return (
    <>
        {/* <Link href="/">
            <a style={{color: 'blue'}}>{`<-`} Back to home</a>
        </Link> */}
        {winReady ? <TreeData /> : null}
    </>
  )
}

export default tree