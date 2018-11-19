import React, {Component} from 'react';

class ButtonsBlock extends Component{

    constructor(props){
        super(props);
        this.state = {
            deletingNodes: false,
            deletingLinks: false,
            addingLinks: false
        }

    }

    handlerAddNode = ()=>{
        this.props.handlerAddNode();
    }

    handlerDeleteNode =() =>{
        this.setState({deletingNodes: true});
        this.props.handlerDeleteNode();
    }

    handlerStopDeletingNode =() =>{
        this.setState({deletingNodes: false});
        this.props.handlerStopDeletingNode();
    }

    handlerAddLink=()=>{
        this.setState({addingLinks: true});
        this.props.handlerAddLink();
    }

    handlerDeleteLink=()=>{
        this.setState({deletingLinks: true});
        this.props.handlerDeleteLink();
    }

    handlerStopDeletingLink=() =>{
        this.setState({deletingLinks: false});
        this.props.handlerStopDeletingLink();
    }

    handlerStopAddingLinks =() =>{
        this.setState({addingLinks: false});
        this.props.handlerStopAddingLink();
    }

    render(){
        return(
            <div>
                <button onClick={this.handlerAddNode}>Add Node</button>
                {!this.state.deletingNodes &&
                <button onClick={this.handlerDeleteNode}>Delete Nodes</button>}
                {this.state.deletingNodes &&
                <button onClick={this.handlerStopDeletingNode}>Stop Deleting Nodes</button>}
                {!this.state.addingLinks &&
                <button onClick={this.handlerAddLink}>Add Link</button>}
                {this.state.addingLinks &&
                <button onClick={this.handlerStopAddingLinks}>Stop Adding Links</button>}
                {this.state.addingLinks &&
                <div>Choose two node</div>}
                {!this.state.deletingLinks &&
                <button onClick={this.handlerDeleteLink}>Delete Links</button>}
                {this.state.deletingLinks &&
                <button onClick={this.handlerStopDeletingLink}>Stop Deleting Links</button>}
            </div>
        )
    }
}

export default ButtonsBlock;