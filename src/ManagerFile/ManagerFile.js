import React, {Component} from 'react'
import {Dropbox} from 'dropbox'
import ListFile from './ListFile/ListFile'
import ToolBar from './ToolBar/ToolBar'
import BtnNav from './BtnNav/BtnNav'
import BtnBack from './BtnBack/BtnBack'
import Tooltip from './Tooltip/Tooltip'
import BtnDownload from './BtnDownload/BtnDownload'

const dbx = new Dropbox({
    accessToken: 'M9hMn7OA82AAAAAAAAAATRGVHEactda_LJzSZvdu3Tm-6M4cB8CHctY-BjETveSE',
    fetch
})

class ManagerFile extends Component{
    
    state = {
        files : [],
        path_lower: '',
        btnNav : ['Disabled', 'Menu', 'Home'],
        clsBtn: ["nav-link"],
        clsTooltip: ['tooltips'],
        downloadHref: '',
        download: '',
        downloadName: '',
        downloadCls : ['download']
    }

    componentDidMount(){
        dbx.filesListFolder({
            path: this.state.path_lower
        }).then(res=> {
            this.setState({files: res.entries,checkbox:false})
        })
    }

    sizes(size){
        const b = 1024;
        const kb = b * 10
        const mb = kb * 100
        const gb = mb * 1000
        if(size < b){
            return size + ' Б'
        }
        else if(size >= b && size < mb){
            return (size/b).toString().slice(0,5) + ' КБ'
        }
        else if(size >= mb && size < gb){
            return (size/mb).toString().slice(0,4) + ' МБ'
        }
        else if(size >= gb){
            return (size/gb).toString().slice(0,3) + ' ГБ'
        }
    }

    dates(dateChange){
        if(dateChange){
            return dateChange.slice(0,10)
        }
    }

    typeImg(type){
        const urlFolder = 'https://freeiconshop.com/wp-content/uploads/edd/folder-outline-filled.png';
        const urlFile = 'http://icons.iconarchive.com/icons/zhoolego/material/512/Filetype-Docs-icon.png';
        if(type === 'folder'){
            return urlFolder
        }
        if(type === "file"){
            return urlFile
        }
    }

    deleteHandler(index){
        dbx.filesDeleteV2({
            path: this.state.files[index].path_lower
        }).then(()=>{
            dbx.filesListFolder({
                path: this.state.path_lower
            }).then(res=> {
                this.setState({files: res.entries})
            })
        })
    }

    nameHandler(index){
        if(this.state.files[index]['.tag']==='folder'){
            dbx.filesListFolder({
                path: this.state.files[index].path_lower
            }).then(res=> {
                this.setState({files:res.entries})
            })
        }
        else if(this.state.files[index]['.tag']==='file'){
            dbx.filesDownload({
                path:this.state.files[index].path_lower
            }).then(data=>{
                let cls = this.state.downloadCls
                cls.push('downActive')
                let downloadUrl = URL.createObjectURL(data.fileBlob)
                this.setState({
                    downloadHref: downloadUrl,
                    download: data.name,
                    downloadName: data.name,
                    downloadCls : cls
                })
            })
        }
    }
    backHandler(){
      window.location.reload()
    }

    deleteDownload(){
        setTimeout(()=>{
            let cls = this.state.downloadCls
            cls.pop()
            this.setState({
                downloadHref: null,
                download: null,
                downloadName: null,
                downloadCls: cls,
                path_lower : ''
            })
        },500)   
    }

    render(){
        return(
            <React.Fragment>
                <BtnBack backClick={this.backHandler.bind(this)}>
                    <img className='img_btn' src="http://pixsector.com/cache/8ed3eed7/avb6b6c2625bcda563bf1.png" alt=""/>
                </BtnBack>
                <ToolBar>
                    {this.state.btnNav.map((item,index)=>{
                        return(
                        <BtnNav
                            cls={this.state.clsBtn.join(' ')}
                            key={index}
                            name={item}
                        >
                            {item.toLowerCase() === 'disabled' ?
                                <Tooltip 
                                    clsTooltip={this.state.clsTooltip.join(' ')}
                                    text={'Not implement'}
                                    title={'Sorry'}
                                /> :
                                null
                            }
                        </BtnNav>
                        )
                    })}
                    
                </ToolBar>
                <div className="container parent_block">
                    {this.state.files.map((item,index)=>{
                        return(
                            <ListFile
                                checked={this.state.checkbox}
                                handleName={this.nameHandler.bind(this, index)}
                                delete={this.deleteHandler.bind(this, index)}
                                id={item.id}
                                key={index}
                                img={this.typeImg(item['.tag'])}
                                name={item.name}
                                size={this.sizes(item.size)}
                                date={this.dates(item.client_modified)}
                            />
                        )
                    })}
                    <BtnDownload
                        href={this.state.downloadHref}
                        download={this.state.download}
                        cls={this.state.downloadCls.join(' ')}
                        name={this.state.downloadName}
                        deleteDownload={this.deleteDownload.bind(this)}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default ManagerFile