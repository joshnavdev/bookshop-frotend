export default {
  namespace: 'car',
  state: {
    data: [],
  },
  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload;
      return {
        ...payload,
        data,
      };
    },
  },
};
