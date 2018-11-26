import { Graph } from 'react-d3-graph';
import React, {Component, Fragment} from 'react';
import ButtonsBlock from './ButtonsBlock';

class MyGraph extends Component {
    constructor(props) {
        super(props);
        this.channelsWeight = [3, 5, 7, 8, 11, 12, 15, 18, 21, 25, 28, 30];
        let data = this.generateNetwork();
        this.state = {
            currentNodeId : data.nodeCurrentId,
            currentTextId : data.currentTextId,
            data : {
                nodes: data.nodes,
                links: data.links
            },
            nodesDeleting: false,
            linksDeleting: false,
            linksAdding: false,
            nodesChosen: [],
            nodesPlaces : {

            }
        };


        this.myConfig = {
                nodeHighlightBehavior: true,
                linkHighlightBehavior: true,

                maxZoom:0,
                minZoom: 0,
                node: {
                    color: 'purple',
                    size: 300,
                    highlightStrokeColor: 'blue',
                    fontSize:15,
                    highlightFontSize: 15,
                    fontColor: "red"
                },
                link: {
                    highlightColor: 'lightblue',
                    strokeWidth: 4,
                    color: 'green'
                }
            };


    }

    generateNetwork= () => {
        let nodes = [];
        let nodeCurrentId = 0;
        let links = [];
        let currentTextId = 0;
        for (let i = 0; i < 30; i++) {
            nodes.push({id: nodeCurrentId + ""});
            nodeCurrentId++;
        }
        ;
        let nMax;
        let i = 0;
        let nodesArr = [];
        for (let i = 0; i < 30; i++) {
            if (nodes[i].id % 2 === 0) {
                nMax = 3;
            } else {
                nMax = 4;
            }
            for (let j = 0; j < nMax; j++) {
                nodesArr.push(nodes[i].id);
            }
        }
        for (let k = 1; k < 4; k++) {
            for (i; i < k * 10; i++) {
                while (nodesArr.indexOf(nodes[i].id) !== -1) {
                    let newLink = {};
                    let target;
                    let arr = nodesArr.filter((node) =>
                        (node <= k * 10 - 1) && (node > (k - 1) * 10)
                        && (node !== nodes[i].id));
                    if (arr.length > 0) {
                        let targetExist = true;
                        while (targetExist) {
                            target = arr[Math.floor(Math.random() * arr.length)];
                            targetExist = false;
                            for (let j = 0; j < links.length; j++) {
                                if (((links[j].source === nodes[i].id) && (links[j].target === target)) ||
                                    ((links[j].source === target) && (links[j].target === nodes[i].id))) {
                                    targetExist = true;
                                }
                            }
                        }
                        let index = nodesArr.indexOf(target);
                        nodesArr.splice(index, 1);
                        newLink = {
                            source: nodes[i].id,
                            target: target,
                            text: {
                                value: this.channelsWeight[Math.floor(Math.random() * this.channelsWeight.length)],
                                id: "text" + currentTextId
                            }
                        };
                        index = nodesArr.indexOf(nodes[i].id);
                        nodesArr.splice(index, 1);
                        links.push(newLink);
                        currentTextId++;
                    } else {
                        break;
                    }
                }
            }
            i = k * 10;
        }

        for(let m = 0; m<3; m++) {
            let targetExist = true;
            let targetArr=[];
            let sourceArr = [];
            let target;
            let source;
            while (targetExist) {
                switch (m) {
                    case 0: targetArr = nodes.slice(0,9);
                            sourceArr = nodes.slice(10,19);
                        break;
                    case 1:
                        targetArr = nodes.slice(10,19);
                        sourceArr = nodes.slice(20,29);
                        break;
                    case 2:
                        targetArr = nodes.slice(20,29);
                        sourceArr = nodes.slice(0,9);
                        break;
                }
                 target = targetArr[Math.floor(Math.random() * targetArr.length)].id;
                 source = sourceArr[Math.floor(Math.random() * sourceArr.length)].id;
                console.log(target + "  "+ source);
                targetExist = false;
                if (target === source) {
                    targetExist = true;
                }
                for (let j = 0; j < links.length; j++) {
                    if (((links[j].source === source) && (links[j].target === target)) ||
                        ((links[j].source === target) && (links[j].target === source))) {
                        targetExist = true;
                    }
                }
            }
            let newLink = {
                source: source,
                target: target,
                text: {
                    value: this.channelsWeight[Math.floor(Math.random() * this.channelsWeight.length)],
                    id: "text" + currentTextId
                }
            };
            links.push(newLink);
            currentTextId++;
        }
            return {nodes: nodes,  nodeCurrentId: nodeCurrentId, links: links, currentTextId: currentTextId};
    };

    onClickGraph =  () => {
       // window.alert(`Clicked the graph background`);
        this.someChanges();
    };


    onClickNode =(nodeId) => {
        if(this.state.data.nodes.length === 1){return}
       if(this.state.nodesDeleting){
           let links = this.state.data.links.filter((link)=>
               String(link.source)===nodeId || String(link.target)===nodeId);
           links.map((link)=>{
               document.getElementById('text'+link.text.id).remove();
               return 0;
           });
           this.setState({data :
                   Object.assign(this.state.data,
                       {nodes: this.state.data.nodes.filter((value)=>String(value.id)!==nodeId),
                       links: this.state.data.links.filter((link)=>
                           String(link.source)!==nodeId && String(link.target)!==nodeId)})});
       }
       if(this.state.linksAdding) {
           let newNode = {id: nodeId};

           if (this.state.nodesChosen.length > 0) {
               for (let i = 0; i < this.state.nodesChosen.length; i++) {
                   console.log(this.state.nodesChosen[i].id);
                   if (this.state.nodesChosen[i].id === nodeId) {
                       return
                   }
               }
           }
           this.setState({nodesChosen: Object.assign(this.state.nodesChosen, this.state.nodesChosen.push(newNode))});
           if (this.state.nodesChosen.length === 2) {
               this.addLink();
           }
       }
        this.someChanges();
    };

    onRightClickNode =(event, nodeId)=> {
       // window.alert(`Right clicked node ${nodeId}`);
    };

    onMouseOverNode = (nodeId) => {
       this.someChanges();
    };


    onMouseOutNode =  (nodeId) => {
        this.someChanges();
    };

    someChanges = () => {
        let nodesChanged = {};
        for(let i =0; i<this.state.data.nodes.length; i++) {
            let id = this.state.data.nodes[i].id;
            let elem = document.getElementById(id);
            if(!elem){
                return;
            }
            let cx = elem.getAttribute('cx');
            let cy = elem.getAttribute('cy');
            if (id in this.state.nodesPlaces) {
                if ((this.state.nodesPlaces[id].cx === cx) &&
                    (this.state.nodesPlaces[id].cy === cy)) {
                    continue;
                }
            }
            nodesChanged[id]=id;
            this.setState({
                nodesPlaces: Object.assign(this.state.nodesPlaces, {[id]:
                        {cx: cx, cy: cy}})
            })
        }
                for(let i=0; i< this.state.data.links.length; i++){
                    let link = this.state.data.links[i];
                    if(link.source in nodesChanged || link.target in nodesChanged){
                        let text = document.getElementById('text'+link.text.id);
                        let targetX = parseFloat(this.state.nodesPlaces[link.target].cx);
                        let targetY = parseFloat(this.state.nodesPlaces[link.target].cy);
                        let sourceX = parseFloat(this.state.nodesPlaces[link.source].cx);
                        let sourceY = parseFloat(this.state.nodesPlaces[link.source].cy);
                        let Xmax;
                        let Xmin;
                        let Ymax;
                        let Ymin;
                        if(targetX>sourceX){
                            Xmax=targetX;
                            Xmin=sourceX;
                        }else {
                            Xmax=sourceX;
                            Xmin=targetX;
                        }
                        if(targetY>sourceY){
                            Ymax=targetY;
                            Ymin=sourceY;
                        }else {
                            Ymax=sourceY;
                            Ymin=targetY;
                        };
                        let x = Xmin+(Xmax-Xmin)/2;
                        let y= Ymin+(Ymax-Ymin)/2;
                        if(text){
                            text.style.left = x+'px';
                            text.style.top = y+'px';
                        }else {
                            let newElem=document.createElement('div');
                            newElem.setAttribute('id', 'text'+link.text.id);
                            newElem.style.left = x+'px';
                            newElem.style.top = y+'px';
                            newElem.style.position = "absolute";
                            newElem.innerText = link.text.value;
                            document.getElementById("graph-id-graph-wrapper").appendChild(newElem);
                        }
                    }}
        };

    onClickLink =  (source, target) => {
        console.log(`linkClicked source: ${source} target: ${target}`);
            if(this.state.linksDeleting){
                let links = this.state.data.links.filter(
                    (link)=>(link.source === source && link.target === target)||
                        (link.source === target && link.target === source));
                links.map((link)=>{
                    document.getElementById('text'+link.text.id).remove();
                    return 0;
                });
            this.setState({data :
                    Object.assign(this.state.data,
                        {links: this.state.data.links.filter(
                            (link)=>(link.source!==source || link.target!==target)&&
                                (link.source!==target || link.target!==source))})})
        }
        this.someChanges();
    };

    onRightClickLink =  (event, source, target) => {
       // window.alert(`Right clicked link between ${source} and ${target}`);
    };

    onMouseOverLink =  (source, target) => {
       // window.alert(`Mouse over in link between ${source} and ${target}`);
        this.someChanges();
    };

    onMouseOutLink =  (source, target) => {
       // window.alert(`Mouse out link between ${source} and ${target}`);
        this.someChanges();
    };

    handlerAddNode= () =>{
        let id=this.state.currentNodeId;
        this.setState({
            currentNodeId: id+1,
            data : Object.assign(this.state.data, this.state.data.nodes.push({id: String(id)}))
        });
    };

    handlerDeleteNode =()=>{
        this.setState({nodesDeleting: true});
        this.someChanges();
    };

    handlerStopDeletingNode=()=>{
        this.setState({nodesDeleting: false});
    };

    handlerAddLink =() =>{
       this.setState({linksAdding: true})
    }

    handlerStopAddingLink= () => {
        this.setState({linksAdding: false})
    }



    addLink = (source, target) =>{
        let id=this.state.currentTextId;

        let newLink ={};
        if(source&& target){
             newLink = {
                source: this.state.source, target: this.state.target,
                text: {
                    value: this.channelsWeight[Math.floor(Math.random() * this.channelsWeight.length)],
                    id: "text" + id
                }
            };
        }else {
            if(this.state.nodesChosen[0].id === this.state.nodesChosen[1].id){
                let arr = [this.state.nodesChosen[0].id];
                this.setState({
                    nodesChosen: arr,
                });
                return;
            }
             newLink = {
                source: this.state.nodesChosen[0].id, target: this.state.nodesChosen[1].id,
                text: {
                    value: this.channelsWeight[Math.floor(Math.random() * this.channelsWeight.length)],
                    id: "text" + id
                }
            };
        }
        for(let i=0; i<this.state.data.links.length; i++){
            if((this.state.data.links[i].source===newLink.source)&&
                (this.state.data.links[i].target===newLink.target)){
                return false;
            }
        }
        this.setState({
            data : Object.assign(this.state.data, this.state.data.links.push(newLink)),
            nodesChosen: [],
            currentTextId: id+1
        });

        this.someChanges();
        return true;
    }

    handlerDeleteLink=()=>{
        this.setState({
            linksDeleting: true
        })
    }

    handlerStopDeletingLink=() =>{
        this.setState({
            linksDeleting: false
        })
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
                handlerStopAddingLink={this.handlerStopAddingLink}
            />
           </Fragment>
        )
    }
}

export default MyGraph;