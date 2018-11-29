function Dijkstra(node, nodes, links) {
    let table = [];
    let unvisitedNodes = [node.id];
    let visitedNodes = [];
    let currentNode = node.id;
    let currentNeighboringNode;
    let currentLinkWeight = 0;

    while(unvisitedNodes.length !== 0){
        for(let i=0; i<links.length; i++){
            if((links[i].channelTypeValue ==="duplex" &&
                (links[i].source === currentNode ||
                links[i].target === currentNode))
                ||
                (links[i].channelTypeValue ==="halfDuplex" &&
                    links[i].source === currentNode)) {


                if (links[i].source === currentNode) {
                    currentNeighboringNode = links[i].target;
                } else {
                    currentNeighboringNode = links[i].source;
                }

                if (currentNeighboringNode !== node.id) {
                    if ((unvisitedNodes.indexOf(currentNeighboringNode) === -1)
                     &&(visitedNodes.indexOf(currentNeighboringNode) === -1)){
                        unvisitedNodes.push(currentNeighboringNode);
                    }
                    currentLinkWeight = links[i].text.value;
                    let found = false;
                    let newRow = {};
                    let exist = false;
                    for (let j = 0; j < table.length; j++) {
                        newRow = {};
                        exist = false;
                        if (table[j].finalNode === currentNode) {
                            found = true;
                            for(let k=0; k< table.length;k++){
                                if((table[k].finalNode === currentNeighboringNode)
                                &&(table[k].neighboringNode === table[j].neighboringNode)){
                                    exist =true;
                                }
                            }
                            if(!exist) {
                                newRow.finalNode = currentNeighboringNode;
                                newRow.neighboringNode = table[j].neighboringNode;
                                newRow.weight = table[j].weight + currentLinkWeight;
                                newRow.buffer = [];
                                table.push(newRow);
                                console.log(currentNode);
                                console.log(newRow);
                            }
                        }
                    }
                    if (found === false) {
                        newRow.finalNode = currentNeighboringNode;
                        newRow.neighboringNode = currentNeighboringNode;
                        newRow.weight = currentLinkWeight;
                        newRow.buffer = [];
                        table.push(newRow);
                        console.log(currentNode);
                        console.log(newRow);
                    }
                }
            }
        }
        let index = unvisitedNodes.indexOf(currentNode);
        unvisitedNodes.splice(index, 1);
        visitedNodes.push(currentNode);
        if(unvisitedNodes.length>0) {
            currentNode = unvisitedNodes[0];
        }
        console.log(unvisitedNodes);
    }
    return table;
}

export default Dijkstra;