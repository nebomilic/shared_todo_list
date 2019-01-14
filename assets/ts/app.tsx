import { h, render } from 'preact';
// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import 'phoenix_html';
import '../css/app.css';
import store from './store';

// Import local files
//
// Local files can be imported directly using relative paths, for example:

import { Provider } from 'redux-zero/preact';
import Main from './containers/Main';

const App = () => (
    <Provider store={store}>
        <Main />
    </Provider>
);

const appHolder: any = document.querySelector('#app');
if (appHolder) {
    render(<App />, appHolder);
}
