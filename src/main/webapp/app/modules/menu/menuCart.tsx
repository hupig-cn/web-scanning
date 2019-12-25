import React from 'react';
import { width } from '@fortawesome/free-solid-svg-icons/faSort';

export interface IMenuCartProps {
  menuList: any[];
  hide: boolean;
}

class MenuCart extends React.Component<IMenuCartProps> {

  state={
    hide: Boolean,
    menuList: []
  }
  constructor(props) {
    super(props);

  }
  render() {
    
    return (
      <div style={{
        width : '100px',
        height : '300px',
        zIndex : 1200,
        color : 'red',
        position : 'fixed',
        top : '100px',
        left : '100px'
    }}>

        {/* {console.log(this.props.menuList)}
        {console.log(this.props.hide)} */}
      </div>

    );
  }
}
export default MenuCart;
