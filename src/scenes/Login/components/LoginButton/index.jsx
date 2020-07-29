import React, { Component } from 'react';

class LoginButton extends Component {
    state = {
      buttonStyle: {backgroundColor: '#16629f', height: '35px', width: '110px',
                    position: 'relative', borderRadius: '5px'},
      textStyle: {fontFamily: 'Arial', color: 'white', fontSize: '18px', fontWeight: 'bold'}
    };
    render() {
        return (
            <button style={this.state.buttonStyle} onMouseOver=
            {() => this.hoverColor('gray')} onMouseLeave=
            {() => this.hoverColor('#16629f')} onClick={this.props.loginClick}>
              <span style={this.state.textStyle}> Continue </span>
            </button>
        );
    }

    hoverColor = (color) => {
      this.setState({buttonStyle: {...this.state.buttonStyle, backgroundColor: color}});
    }
}

export default LoginButton;
