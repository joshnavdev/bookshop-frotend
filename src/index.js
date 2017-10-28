import dva from 'dva';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';

import 'semantic-ui-css/semantic.min.css';
import '../public/index.html';

// 1. Initialize
const app = dva({
  ...createLoading(),
  history: browserHistory,
  onError(error) {
    console.error('error:', error);
  },
});


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
