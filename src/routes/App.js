import React from 'react';
import { connect } from 'dva';

import { Header } from '../components/layout';

const App = ({
  children,
}) => {
  return (
    <div >
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
};

export default connect()(App);
