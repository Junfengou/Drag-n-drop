import React from 'react'
import TreeData from '../components/TreeData'
import Link from 'next/link';

function tree() {
  return (
    <>
        <Link href="/">
            <a style={{color: 'blue'}}>{`<-`} Back to home</a>
        </Link>
        <TreeData />
    </>
  )
}

export default tree