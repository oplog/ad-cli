import * as React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { Provider } from "react-redux";
import { history, initStore } from '../store';
import logo from './../logo.svg';

const store = initStore();

export class App extends React.Component {
  // public render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to atomic design template</h1>
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <p className="App-intro">
  //         Here's the file tree;
  //       </p>
  //     </div>
  //   );
  // }

  public render() {
    return (
      <Provider store={store}>
          <>
            <ConnectedRouter history={history}>
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to atomic design template</h1>
                </header>
                <p className="App-intro">
                  To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p className="App-intro">
                  Here's the file tree;
                </p>
              </div>
            </ConnectedRouter>
          </>
      </Provider>
    );
  }
}
