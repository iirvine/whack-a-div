import React from 'react';
import Surface from './surface';

window.React = React;

React.render(<Surface rectCount={5} />,
  document.getElementById('app'));