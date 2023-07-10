import React from 'react'

const Container = (props) => {
  return (
    <section className={props.class1}>
        <div className="container px-5 py-2">{props.children}</div>
    </section>
  )
}

export default Container