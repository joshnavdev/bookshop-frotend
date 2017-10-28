import React, { Component } from 'react';
import { connect } from 'dva';
import axios from 'axios';
import { Button, Checkbox, Form, Grid, Segment } from 'semantic-ui-react';
import config from '../../config';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      author: '',
      category: '',
      price: '',
      stock: '',
    };
  }
  handleClick = (e) => {
    e.preventDefault();
    axios.post(`${config.uri}/books`, this.state)
    .then(res => {
      console.log(res)
      this.setState({
        name: '',
        author: '',
        category: '',
        price: '',
        stock: '',
      })
    })
    .catch(err => console.log(err));
  };

  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value,
    });
  }

/*
render = () => {
    return (
      <div>
        <input placeholder="Nombre del libro" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} /><br/>
        <input placeholder="Nombre del Autor" value={this.state.author} onChange={this.handleChange.bind(this, 'author')} /><br/>
        <input placeholder="Categoria" value={this.state.category} onChange={this.handleChange.bind(this, 'category')} /><br/>
        <input placeholder="Precio" value={this.state.price} onChange={this.handleChange.bind(this, 'price')} /><br/>
        <input placeholder="Stock" value={this.state.stock} onChange={this.handleChange.bind(this, 'stock')} /><br/>
        <br/>
        <button onClick={this.handleClick}>POST</button>
      </div>
    );
  };
*/
render = () => {
  return (
    <Grid centered columns="4">

      <Grid.Column style={{ background: 'white', marginTop: '120px' }}>
        <Segment>
          <h1>Registrar Libro</h1>
        </Segment>
        <Form>
          <Form.Field>
            <input placeholder="Nombre del libro" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} /><br/>
          </Form.Field>
          <Form.Field>
            <input placeholder="Nombre del Autor" value={this.state.author} onChange={this.handleChange.bind(this, 'author')} /><br/>
          </Form.Field>
          <Form.Field>
            <input placeholder="Categoria" value={this.state.category} onChange={this.handleChange.bind(this, 'category')} /><br/>
          </Form.Field>
          <Form.Field>
            <input placeholder="Precio" value={this.state.price} onChange={this.handleChange.bind(this, 'price')} /><br/>
          </Form.Field>
          <Form.Field>
            <input placeholder="Stock" value={this.state.stock} onChange={this.handleChange.bind(this, 'stock')} /><br/>
          </Form.Field>
          <Button color="teal" fluid onClick={this.handleClick}>Registrar</Button>
        </Form>
      </Grid.Column>
    </Grid>
  )
}
};

export default connect()(Admin);
