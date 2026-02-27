/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import './index.css';
import App from './App';
import DesignDetail from './pages/DesignDetail';

const root = document.getElementById('root');

render(() => (
  <Router>
    <Route path="/" component={App} />
    <Route path="/design/:id" component={DesignDetail} />
  </Router>
), root!);
