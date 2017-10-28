import React from 'react';
import { Router } from 'dva/router';

import App from './routes/App';
import Admin from './routes/Admin'

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}

export default ({ history, app }) => {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/books'));
          cb(null, { component: require('./routes/Books') });
        }, 'books');
      },
      childRoutes: [
        {
          path: 'books',
          name: 'books',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/books'));
              cb(null, require('./routes/Books'));
            }, 'books');
          },
        },
        {
          path: 'car',
          name: 'car',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/books'));
              cb(null, require('./routes/car'));
            }, 'book');
          },
        },
        {
          path: 'adminBooks',
          name: 'administrar',
          component: Admin,
        },
      ],
    },
  ];
  return (
    <Router history={history} routes={routes} />
  );
}
