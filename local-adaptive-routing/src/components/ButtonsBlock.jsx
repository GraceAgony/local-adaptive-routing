import React, {Component} from 'react';

class ButtonsBlock extends Component{

    constructor(props){
        super(props);
        this.state = {
            deletingNodes: false,
            deletingLinks: false,
            addingLinks: false,
            manualInput: false,
            channelTypeValue: "duplex",
            weightSettingValue: "random",
            manualInputValue: "3"
        }

    }

    handlerAddNode = ()=>{
        this.props.handlerAddNode();
    };

    handlerDeleteNode =() =>{
        this.setState({deletingNodes: true});
        this.props.handlerDeleteNode();
    };

    handlerStopDeletingNode =() =>{
        this.setState({deletingNodes: false});
        this.props.handlerStopDeletingNode();
    }

    handlerAddLink=()=>{
        this.setState({addingLinks: true});
        this.props.handlerStartAddingLinks();
    };

    addLink =() =>{
        this.props.handlerAddLink(this.state.manualInput,
            this.state.channelTypeValue, this.state.weightSettingValue,
            this.state.manualInputValue);
    };

    handlerDeleteLink=()=>{
        this.setState({deletingLinks: true});
        this.props.handlerDeleteLink();
    };

    handlerStopDeletingLink=() =>{
        this.setState({deletingLinks: false});
        this.props.handlerStopDeletingLink();
    };

    handlerStopAddingLinks =() =>{
        this.setState({addingLinks: false});
        this.props.handlerStopAddingLink();
    };

    channelTypeChanged = (event) =>{
        this.setState({channelTypeValue: event.target.value});
        this.props.handlerParamsChanged(this.state.manualInput,
            event.target.value,
            this.state.weightSettingValue,
            this.state.manualInputValue);
    };

    weightSettingChanged = (event) =>{
        if(event.target.value === "manualInput"){
            this.setState({weightSettingValue: event.target.value,
                manualInput: true});
        }else {
            this.setState({weightSettingValue: event.target.value,
                manualInput: false });
        }
        this.props.handlerParamsChanged(this.state.manualInput,
            this.state.channelTypeValue,
            event.target.value,
            this.state.manualInputValue);
    };

    manualInputValueChange = (event) =>{
        this.setState({manualInputValue: event.target.value});
        this.props.handlerParamsChanged(
            this.state.manualInput,
            this.state.channelTypeValue,
            this.state.weightSettingValue,
            event.target.value);
    };

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
                {this.state.addingLinks&&
                 <div>
                     <select name="channelType" value={this.state.channelTypeValue} onChange={this.channelTypeChanged}>
                        <option value="duplex">Duplex</option>
                        <option value="halfDuplex">Half-Duplex</option>
                     </select>
                     <select name="weightSetting" value={this.state.weightSettingValue} onChange={this.weightSettingChanged}>
                         <option value="random">Random</option>
                         <option value="manualInput">Manual Input</option>
                     </select>
                 </div>}
                {this.state.manualInput&&
                this.state.addingLinks&&
                    <div>
                        <div>Choose channel weight</div>
                         <select name="manualInput" value={this.state.manualInputValue}
                         onChange={this.manualInputValueChange}>
                             <option value="3">3</option>
                             <option value="5">5</option>
                             <option value="7">7</option>
                             <option value="8">8</option>
                             <option value="11">11</option>
                             <option value="12">12</option>
                             <option value="15">15</option>
                             <option value="18">18</option>
                             <option value="21">21</option>
                             <option value="25">25</option>
                             <option value="28">28</option>
                             <option value="30">30</option>
                         </select>
                    </div>
                }
                {this.state.addingLinks&&
                <button onClick={this.addLink}>Add link</button>}
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