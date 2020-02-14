import React from 'react'

const BtnDownload = props =>{

    return(
        <a href={props.href} download={props.download} className={props.cls} onClick={props.deleteDownload}>
            Download: {props.name}
        </a>
    )
}
export default BtnDownload