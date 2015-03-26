import React from 'react'

const Surface = React.createClass({
  getInitialState() {
    return {width: window.innerWidth, height: window.innerHeight};
  },

  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  },

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  },

  render() {
    let {width, height} = this.state;

    return <div style={{width: width, height: height}}>Surface</div>;
  }
});

export default Surface