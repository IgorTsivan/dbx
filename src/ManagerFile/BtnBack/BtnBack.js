import React from 'react'

const BtnBack = props =>{

    return(
        <button className="btnBack" type="button" onClick={props.backClick}>
            {props.children}
        </button>  
    )
}
export default BtnBack