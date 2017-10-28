import React from 'react';
import Book from './Book';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'dva';

const Books = ({ books, dispatch, loading }) => {
  const getBooks = (bs) => {
    return bs.map((book, key) => {
      console.log(key)
      return (
        <Grid.Column key={key} >
          <Book book={book} dispatch={dispatch} item={false} />
        </Grid.Column>
      );
    });
  };

  return (
    <Grid centered columns={4} style={{ padding: '0 10px' }}>
      <Dimmer active={loading} inverted>
        <Loader>Cargando...</Loader>
      </Dimmer>
      {getBooks(books.data.toJS())}
    </Grid>
  );
};

export default connect(({ books, loading }) => ({ books, loading: loading.models.books }))(Books);
