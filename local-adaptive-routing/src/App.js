import React, { Component } from 'react';
import MyGraph from './components/Graph';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {}

    }

    render() {
        return (
            <div className="graphContainer" >
                <MyGraph  />
            </div>
        )
    }
}

export default App;