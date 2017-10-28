import React from 'react';
import { Table } from 'semantic-ui-react';

const Invoice = ({ books, totalPrice }) => {
  console.log(books);
  const renderBooks = (data) => {
    return data.map(book => {
      return (
        <Table.Row key={book.id}>
          <Table.Cell ><label><b>{book.name}</b></label>{' - '}<label><i>{book.author}</i></label></Table.Cell>
          <Table.Cell textAlign="center" >{`S/. ${book.price}`}</Table.Cell>
          <Table.Cell textAlign="center" >{book.quantity}</Table.Cell>
          <Table.Cell textAlign="center" >{`S/. ${(book.price * book.quantity).toFixed(2)}`}</Table.Cell>
        </Table.Row>
      );
    });
  };
  return (
    <Table >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={9}>Descripcion</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2} >Precio/Und</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2} >Unidades</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={3} >Precio</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {renderBooks(books)}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell textAlign="right" >Total:</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" >{`S/. ${totalPrice}`}</Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default Invoice;
