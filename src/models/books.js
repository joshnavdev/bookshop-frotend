import axios from 'axios';
import { List, fromJS } from 'immutable';
import config from '../config';

export default {
  namespace: 'books',
  state: {
    data: new List(),
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const books = yield call(() => {
        return axios.get(`${config.uri}/books`)
          .then(resp => resp)
          .catch(error => error);
      });
      console.log(books)
      yield put({
        type: 'querySuccess',
        payload: {
          data: books.data,
        },
      });
    },
    *createOrder({ payload }, { call, put }) {
      // crear order con el idClient
      const { order } = payload;
      const orderReturned = yield call(() => {
        return axios.post(`${config.uri}/orders`, order)
          .then(res => res)
          .catch(err => err);
      });
      const orderId = orderReturned.data.id;
      const { orderDetail } = payload;
      const newOrderDetail = orderDetail.map(od => {
        return {
          ...od,
          orderId,
        };
      });
      console.log('order ->', orderReturned);
      // llamar a createOrderDetail y mandarle el idOder y la data
      yield put({
        type: 'createOrderDetail',
        payload: {
          orderDetail: newOrderDetail,
        },
      });
    },
    *createOrderDetail({ payload }, { call }) {
      const { orderDetail } = payload;
      const orderDetailReturned = yield call(() => {
        return axios.post(`${config.uri}/order_details`, orderDetail)
          .then(res => res)
          .catch(err => err);
      });

      console.log('orderDetail ->', orderDetailReturned);
    },
  },
  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload;
      return {
        ...state,
        ...payload,
        data: fromJS(data),
      };
    },
    resetData(state) {
      const books = state.data;
      console.log(books);
      return {
        ...state,
        data: books.map(book => book.merge({ quantity: 0, isSelected: false })),
      };
    },
    addCar(state, { payload }) {
      const { data } = payload;
      const { id } = data;
      const books = state.data;
      const indexBook = books.findIndex(book => book.get('id') === id);
      const newBook = {
        ...data,
        isSelected: true,
        quantity: 1,
      };
      return {
        ...state,
        data: books.updateIn([indexBook], book => book.merge(newBook)),
      };
    },
    addQuantity(state, { payload }) {
      const { quantity, id } = payload;
      const books = state.data;
      const indexBook = books.findIndex(book => book.get('id') === id);
      return {
        ...state,
        data: books.updateIn([indexBook], book => book.merge({ quantity })),
      };
    },
  },
};
