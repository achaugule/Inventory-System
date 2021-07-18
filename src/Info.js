import React from "react";
import { PropTypes } from 'prop-types';

class Info extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount(){
    console.log("Mounted!");
  }

  componentDidUpdate(){
    console.log("Updated!");
  }

  componentWillUnmount(){
    console.log("cleanup!");
  }

  buttonPressed(){
    this.setState({
      count: this.state.count + 1,
    });
    console.log('Clicked');
    //this.props.destroy(false);
  }
  render() {

    return(
      <div>
      <p>Counter: {this.state.count}</p>
      <button className="btn btn-primary" onClick={() => this.buttonPressed()}>Click Me</button>
      </div>
    );
    
    const Title = this.props.title;
    const showTitle = true;

    if (showTitle) {
      return (
        <div>
          <h1>Title: {Title}</h1>
        </div>
      );
    } else {
      return <p>No Title</p>;
    }
  }
}

Info.defaultProps = {
  title: "Default"
}

Info.propTypes = {
  title: PropTypes.string,
}

export default Info;
