import React from 'react';
import ReactDOM from 'react-dom';
import init from './app/initializations';
import './index.css';

init();

import App from './app/app';

ReactDOM.render(<App />, document.getElementById('root'));
