import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LoginButton extends Component {
    state = {
      buttonStyle: {backgroundColor: '#0033cc', height: '45px', width: '130px',
                    position: 'relative', borderRadius: '5px'},
      textStyle: {fontFamily: 'Arial', color: 'white', fontSize: '20px'}
    };
    render() {
        return (
            <button style={this.state.buttonStyle} onMouseOver=
            {() => this.hoverColor('gray')} onMouseLeave=
            {() => this.hoverColor('#0033cc')} onClick={this.props.loginClick}>
              <span style={this.state.textStyle}> Log in </span>
            </button>
        );
    }

    hoverColor = (color) => {
      this.setState({buttonStyle: {...this.state.buttonStyle, backgroundColor: color}});
    }




}

export default LoginButton;
