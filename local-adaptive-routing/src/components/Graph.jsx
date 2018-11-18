import { Graph } from 'react-d3-graph';
import React, {Component, Fragment} from 'react';
import ButtonsBlock from './ButtonsBlock';

class MyGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentNodeId : 0,
            data : {
                nodes: [{id: 'Harry'}, {id: 'Sally'}, {id: 'Alice'}],
                links: [{source: 'Harry', target: 'Sally'}, {source: 'Harry', target: 'Alice'}]
            },
            nodesDeleting: false,
            linksDeleting: false,
            linksAdding: false,
            nodesChosen: [],
        };

        this.myConfig = {
                nodeHighlightBehavior: true,
                node: {
                    color: 'purple',
                    size: 120,
                    highlightStrokeColor: 'blue'
                },
                link: {
                    highlightColor: 'lightblue'
                }
            };
    }

    onClickGraph =  () => {
       // window.alert(`Clicked the graph background`);
    };

    onClickNode =(nodeId) => {
        if(this.state.data.nodes.length === 1){return}
       if(this.state.nodesDeleting){
           this.setState({data :
                   Object.assign(this.state.data,
                       {nodes: this.state.data.nodes.filter((value)=>String(value.id)!==nodeId),
                       links: this.state.data.links.filter((link)=>
                           String(link.source)!==nodeId && String(link.target)!==nodeId)})});
           console.log(this.state);
       }
       if(this.state.linksAdding){
           this.setState({nodesChosen: this.state.nodesChosen.push(                                                 {id:nodeId})});
           if(this.state.nodesChosen.length === 2){
               this.addLink();
           }
       }
    };

    onRightClickNode =(event, nodeId)=> {
       // window.alert(`Right clicked node ${nodeId}`);
    };

    onMouseOverNode = (nodeId) => {
        //window.alert(`Mouse over node ${nodeId}`);
    };

    onMouseOutNode =  (nodeId) => {
       // window.alert(`Mouse out node ${nodeId}`);
    };

    onClickLink =  (source, target) => {
        //window.alert(`Clicked link between ${source} and ${target}`);
    };

    onRightClickLink =  (event, source, target) => {
       // window.alert(`Right clicked link between ${source} and ${target}`);
    };

    onMouseOverLink =  (source, target) => {
       // window.alert(`Mouse over in link between ${source} and ${target}`);
    };

    onMouseOutLink =  (source, target) => {
       // window.alert(`Mouse out link between ${source} and ${target}`);
    };

    handlerAddNode= () =>{
        let id=this.state.currentNodeId;
        this.setState({
            currentNodeId: id+1,
            data : Object.assign(this.state.data, this.state.data.nodes.push({id: id}))
        });
    };

    handlerDeleteNode =()=>{
        this.setState({nodesDeleting: true});
    };

    handlerStopDeletingNode=()=>{
        this.setState({nodesDeleting: false});
    };

    handlerAddLink =() =>{
       this.setState({linksAdding: true})
    }

    addLink = () =>{
        this.setState({
            data : Object.assign(this.state.data, this.state.data.links.push(
                {source: this.state.nodesChosen[0], target: this.state.nodesChosen[1]})),
            nodesChosen: []
        });
    }

    handlerDeleteLink=()=>{

    }

    handlerStopDeletingLink=() =>{

    }

    render() {
        return (
           <Fragment>
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={this.state.data}
                config={this.myConfig}
                onClickNode={this.onClickNode}
                onRightClickNode={this.onRightClickNode}
                onClickGraph={this.onClickGraph}
                onClickLink={this.onClickLink}
                onRightClickLink={this.onRightClickLink}
                onMouseOverNode={this.onMouseOverNode}
                onMouseOutNode={this.onMouseOutNode}
                onMouseOverLink={this.onMouseOverLink}
                onMouseOutLink={this.onMouseOutLink}
            />
            <ButtonsBlock
                handlerAddNode={this.handlerAddNode}
                handlerDeleteNode={this.handlerDeleteNode}
                handlerStopDeletingNode={this.handlerStopDeletingNode}
                handlerAddLink={this.handlerAddLink}
                handlerDeleteLink={this.handlerDeleteLink}
                handlerStopDeletingLink={this.handlerStopDeletingLink}
            />
           </Fragment>
        )
    }
}

export default MyGraph;