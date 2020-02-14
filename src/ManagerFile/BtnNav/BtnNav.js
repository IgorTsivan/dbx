import React from 'react'

const BtnNav = props =>{

    return(
        <React.Fragment>
            <div className="block">
                <li className='nav-item'>
                    <input className={props.cls} type="button" onClick={props.disableClick} defaultValue={props.name}/>
                    <div className="tooltip_block">
                        {props.children}
                    </div>
                </li>
            </div>
            
        </React.Fragment>
        
    )
}
export default BtnNav