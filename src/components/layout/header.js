import React from 'react';
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Link } from 'dva/router';

class Header extends React.Component {


  render = () => {
    return (
      <div>
        <Menu>
          <Menu.Item><Link to="/books" >Inicio</Link></Menu.Item>
          <Menu.Menu position="right" style={{ marginLeft: '10%', width: '50%' }} >
            <Input icon="search" placeholder="Buscar..." style={{ width: '100%' }} />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item> Cameron Kruston </Menu.Item>
            <Menu.Item><Link to="/car" ><Icon color="teal" name="shop" size="large" /></Link></Menu.Item>
            <Menu.Item> Salir </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div>{this.props.children}</div>
      </div>
    );
  };
}

export default Header;
