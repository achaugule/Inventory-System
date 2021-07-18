import React from 'react';

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }

    render(){
        return(
            <div>
            <p>This is Class</p>
            <button className="btn btn-primary">Click Me!</button>
            </div>
        );
    }
}