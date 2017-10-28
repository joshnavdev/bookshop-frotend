import React, { Component } from 'react';
import { Card, Button, Icon, Input } from 'semantic-ui-react';

// const Book = ({ book, dispatch, item }) => {
class Book extends Component {
  state = {
    partialPrice: this.props.book.price * this.props.book.quantity,
    quantity: this.props.book.quantity,
  }
  onChange = (e) => {
    const value = e.target.value;
    const oldPartialPrince = this.state.partialPrice;
    const newPartialPrince = value * this.props.book.price;

    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'books/addQuantity',
      payload: {
        id: this.props.book.id,
        quantity: value,
      },
    });
    this.setState({
      partialPrice: newPartialPrince.toFixed(2),
      quantity: value || 0,
    });
    this.props.changeTotalPrice(oldPartialPrince, newPartialPrince);
  }
  handleAddCar = (data) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'books/addCar',
      payload: {
        data,
      },
    });
  };

  render = () => {
    const { book, item } = this.props;
    const { quantity, partialPrice } = this.state;
    const extra = item === false ? (
      <div>
        <span>{`Price: S/. ${book.price}`}</span>
        <br />
        <br />
        <Button disabled={book.isSelected} animated="vertical" color="teal" style={{ width: '100%' }} onClick={this.handleAddCar.bind(this, book)}>
          <Button.Content hidden>Agregar al carrito</Button.Content>
          <Button.Content visible >
            <Icon name="shop" />
          </Button.Content>
        </Button>
      </div>
    ) : (
      <div>
        <span>{`Precio taota: S/. ${partialPrice}`}</span>
        <br />
        <br />
        <Input style={{ width: '100%' }} label={{ color: 'teal', content: 'Cantidad' }} type="number" min="0" value={quantity} onChange={this.onChange} />
      </div>
    );

    return (
      <Card
        style={item === true ? { width: '3000' } : { width: '100%' }}
        header={book.name}
        meta={book.author}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum nisi ut turpis rutrum, in lacinia mi ultrices."
        extra={extra}
      />
    );
  }
}

export default Book;
