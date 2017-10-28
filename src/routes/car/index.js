import React, { Component } from 'react';
import { connect } from 'dva';
import { Grid, Input, Dimmer, Loader, Confirm } from 'semantic-ui-react';
import Book from '../Books/Book';
import Invoice from './Invoice';

class Car extends Component {
  constructor(props) {
    super(props);
    const books = props.books.data.toJS();
    const totalPrice = books.filter(book => book.isSelected).reduce((ant, act) => (ant + (Number)(act.price * act.quantity)), 0);
    this.state = {
      totalPrice: totalPrice.toFixed(2),
      showConfirm: false,
    };
  }

  onClick = () => {
    this.setState({
      showConfirm: true,
    });
  }
  getBooks = (books) => {
    return books.filter(book => book.isSelected);
  }
  handleCancel = () => {
    this.setState({
      showConfirm: false,
    });
  }
  saveOrder = () => {
    const books = this.props.books.data.toJS();
    const cart = books.filter(book => book.isSelected);
    const payload = cart.map(product => {
      const { id, quantity, price } = product;
      const partial_price = (quantity * price).toFixed(2);
      return {
        quantity,
        unity_price: price,
        partial_price,
        bookId: id,
      };
    });
    this.props.dispatch({
      type: 'books/createOrder',
      payload: {
        order: {
          clientId: '59bfae90b0cc082b10f406eb',
          total_price: this.state.totalPrice,
        },
        orderDetail: payload,
      },
    });
    this.props.dispatch({
      type: 'books/resetData',
    });
    this.setState({
      showConfirm: false,
      totalPrice: 0.00,
    });
  }

  changeTotalPrice = (oldPartialPrice, newPartialPrice) => {
    const newTotalPrice = Number(this.state.totalPrice - oldPartialPrice) + newPartialPrice;
    this.setState({
      totalPrice: newTotalPrice.toFixed(2),
    });
  }

  renderBooks = (books) => {
    return books.map((book, key) => {
      return (
        <Grid.Column key={key}>
          <Book book={book} item changeTotalPrice={this.changeTotalPrice} dispatch={this.props.dispatch} />
        </Grid.Column>
      );
    });
  }
  render = () => {
    const books = this.props.books.data;
    const { loading } = this.props;
    const filteredBooks = this.getBooks(books.toJS());

    return (
      <Grid columns={2} style={{ padding: '0 10px' }}>
        <Dimmer active={loading} inverted>
          <Loader>Cargando...</Loader>
        </Dimmer>
        {this.renderBooks(filteredBooks)}
        <Grid.Row columns={1} centered>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'cart',
              content: 'Comprar',
              onClick: this.onClick,
              // disabled: filteredBooks.length === 0,
            }}
            actionPosition="left"
            value={this.state.totalPrice}
          />
          <Confirm
            style={{ padding: '0 5px' }}
            open={this.state.showConfirm}
            header="Confirmar compra"
            // content="Seguro de realizar la compra?"
            content={(<Invoice books={filteredBooks} totalPrice={this.state.totalPrice} />)}
            cancelButton="Cancelar"
            confirmButton="Confirmar"
            onCancel={this.handleCancel}
            onConfirm={this.saveOrder}
          />
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(({ books, loading }) => ({ books, loading: loading.models.books }))(Car);
