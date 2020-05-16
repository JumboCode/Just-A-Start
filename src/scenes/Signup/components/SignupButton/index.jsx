import React, { Component } from 'react';

class SignUpButton extends Component {
    state = {
      buttonStyle: {backgroundColor: '#16629f', height: '42px', width: '120px',
                    position: 'relative', borderRadius: '5px'},
      textStyle: {fontFamily: 'Arial', color: 'white', fontSize: '20px', fontWeight: 'bold'}
    };
    render() {
        return (
            <button style={this.state.buttonStyle} onMouseOver=
            {() => this.hoverColor('gray')} onMouseLeave=
            {() => this.hoverColor('#16629f')} onClick={this.props.signUpClick}>
              <span style={this.state.textStyle}> Sign Up </span>
            </button>
        );
    }

    hoverColor = (color) => {
      this.setState({buttonStyle: {...this.state.buttonStyle, backgroundColor: color}});
    }




}

export default SignUpButton;