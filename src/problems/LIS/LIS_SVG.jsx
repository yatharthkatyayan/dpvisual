import React, { Component } from 'react';
class LIScurve extends Component {
    state = {  }
    render() { 
        const{curve} = this.props;
        return (<path
            d = {`${curve}`}
            curve = {curve}
            stroke = "black"
            strokeWidth = "4px"
        ></path>  );
    }
}
 
export default LIScurve;