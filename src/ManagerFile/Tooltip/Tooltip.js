import React from 'react'

const Tooltip = props =>{

    return(
        <div className={props.clsTooltip}>
            <h5> {props.title} </h5>
            <p> {props.text} </p>
        </div>
    )
}
export default Tooltip