import { render } from 'solid-js/web';

import './App/index.css';
import App from './App/App';
import { Router } from '@solidjs/router';

render(() => <Router>
    <App />
</Router>, document.getElementById('root') as HTMLElement);