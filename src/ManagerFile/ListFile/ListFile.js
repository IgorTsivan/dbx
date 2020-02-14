import React from 'react'
const ListFile = props =>{

    return(
        <div className={'row list_block'}>
            <div className="col-2"> 
                <div className="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" className="custom-control-input" id={props.id} defaultChecked={props.checked} onChange={props.changeClick} />
                <label className="custom-control-label" htmlFor={props.id}></label>
                </div>
            </div>
            <div className="col-5"> 
                <img className="img_f" src={props.img} alt=""/> 
                <input className="name" type="button" onClick={props.handleName} defaultValue={props.name} /> 
            </div>
            <div className="col-2"> <span className="size">{props.size}</span> </div>
            <div className="col-2"> 
                <span className="date">{props.date}</span> 
            </div>
            <div className="col-1">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu info_block" aria-labelledby="dropdownMenuButton">
                        <ul>
                            <li>
                                <button onClick={props.delete} >Удалить</button>
                            </li>
                            <li>
                                <button disabled>Скачать</button>
                            </li>
                            <li>
                                <button disabled>Информация</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListFile