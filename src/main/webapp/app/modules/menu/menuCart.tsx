import React from 'react';

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
      <div>
      <div style={{
        width : '100%',
        height : '25%',
        zIndex : 1000,
        background : 'rgba(0, 0, 0, 0.50)',
        position : 'fixed',
        top : '12.5%',
        left : '0px'
    }}>
      </div>
        <div style={{
        width : '100%',
        height : '56.2%',
        zIndex : 1000,
        background : 'rgba(225, 225, 225, 1)',
        position : 'fixed',
        top : '37.5%',
        left : '0px'}}>


        </div>
      </div>

    );
  }
}
export default MenuCart;
// {...this.state.menuList.map((item, index) => (
//   <div
//     key={item.name}
//     style={{
//       padding: '10px',
//       borderBottom: '1px solid #ececec',
//       overflow: 'hidden'
//     }}
//   >
//     <div id={ item.name }>{ item.name }</div>
//     { item.list.map((newName, inx) => (
//       <div
//         key={newName.name}
//         style={{
//           padding: '10px',
//           borderBottom: '1px solid #ececec',
//           overflow: 'hidden'
//         }}
//       >
//         <span>
//           <img
//             style={{
//               width: '50px',
//               height: '50px',
//               float: 'left'
//             }}
//             src={newName.url}
//           />
//         </span>
//         <span
//           style={{
//             float: 'left',
//             width: 'calc(100% - 75px)',
//             fontSize: '1.05rem',
//             marginLeft: '15px',
//             textAlign: 'left'
//           }}
//         >
//           {newName.cainame}
//         </span>
//         <span
//           style={{
//             float: 'left',
//             width: 'calc(100% - 75px)',
//             fontSize: '0.93rem',
//             marginLeft: '15px',
//             textAlign: 'left'
//           }}
//         >
//           <span style={{ color: '#fe4365' }}>￥{newName.caiprice}</span>/份
//           <span style={{ float: 'right' }}>
//             <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/plus.png"
//             onClick={this.clickPlus.bind(this, newName, parseInt(newName.cainum, 10), [index, inx])}
//                 // ()=>this.handleLogin(this.state.iocId,parseInt(newName.cainum)+1,this.state.merchatid,newName.cainame)}
//               />
//               {/* {
//               //console.log(newName)
//             }shopid_1_categoryid_2_dish_3 */}
//          <span style={{ float: 'right' }}>- {newName.cainum} -</span> {/*  {shopid10}  _{index} _ {inx} */}
//             <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/cut.png"
//             onClick = { this.clickCut.bind(this, newName, parseInt(newName.cainum, 10), [index, inx])} />
//           </span>
//         </span>
//       </div>
//     ))}
//   </div>
// ))}