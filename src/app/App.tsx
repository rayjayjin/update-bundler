import 'app/App.scss';

import * as React from 'react';
import { withState, compose } from 'recompose';
import { isDev, isProd } from 'config';

const enhance = withState('counter', 'setCounter', 2);

class Main extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className="title">React App Main</div>
        <div className="main" />
        <h3>Webpack HMR TEST Examples</h3>
        <h3>numbers: {this.props.counter}</h3>
        <h3>isDevs: {`val is: ${isDev}`}</h3>
        <h3>isProd: {isProd}</h3>
      </div>
    )
  }
}

const App = enhance(Main as any);

export default App;