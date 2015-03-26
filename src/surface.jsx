import React from 'react'

const Rect = React.createClass({
  getDefaultProps() {
    return {
      width: 100,
      height: 100
    };
  },

  getInitialState() {
    return {
      hidden: false
    };
  },

  componentWillUpdate(newProps, newState) {
    if (newProps.x !== this.props.x || newProps.y !== this.props.y) {
      this.setState({hidden: false});
    }
  },

  onClick() {
    this.setState({hidden: true});
    this.props.onClick();
  },

  render() {
    let {width, height, x, y} = this.props;
    let styles = {
      backgroundColor: 'green', 
      position: 'absolute', 
      width: width, 
      height: height, 
      top: y, 
      right: x, 
      display: this.state.hidden ? 'none' : 'block'
    };

    return <div style={styles} onClick={this.onClick}></div>;
  }
});

const Surface = React.createClass({
  getInitialState() {
    return {
      width: window.innerWidth, height: window.innerHeight,
      total: 0,
      positions: []
    };
  },

  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  },

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.interval = setInterval(this.refresh, 1500);
    this.refresh();
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    clearInterval(this.interval);
  },

  onRectClick(e) {
    this.setState({total: this.state.total + 1}, () => console.log(`Current total: ${this.state.total}`));
  },

  generateRandomPosition() {
    let maxX = this.state.width / 100;
    let maxY = this.state.height / 100;

    return [(Math.floor(Math.random() * maxX) * 100), (Math.floor(Math.random() * maxY) * 100)];
  },

  refresh() {
    let newPositions = [];
    for (let i = 0; i <= this.props.rectCount; i++) {
      newPositions.push(this.generateRandomPosition());
    }

    this.setState({positions: newPositions});
  },

  render() {
    let {width, height} = this.state;

    return (
      <div style={{width: width, height: height}}>
        {this.state.positions.map(([x, y], idx) => {
          return <Rect key={idx} x={x} y={y} onClick={this.onRectClick} />;
        })}
      </div>);
  }
});

export default Surface