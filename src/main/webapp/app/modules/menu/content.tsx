import React from 'react';
import { merchantName } from 'app/requests/menu/menu.reducer';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';

export interface ContentInt extends StateProps, DispatchProps {}

export class Content extends React.Component<ContentInt> {
  // export const titleName =  '某某商家';
  state = {
    getTitleList: []
    };
  
  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    // this.props.menu("12","34")
    
    this.props.merchantName((window.location.search.substring(1).split("&")[0]).split("=")[1]).then(res => {
      console.log(res);
      if (res.value.data.data) {
        // let reactor = "1";
        console.log(res.value.data.data)
        this.setState({
          getTitleList: res.value.data.data
          
        });
        }
    });
    
  }
  
  render() {
    function goBack() {
      history.go(-1);
    }
  
  return (
    <div>
    <div
      style={{
        backgroundColor: '#fe4365',
        height: '40px',
        textAlign: 'center',
        padding: '7px',
        width: '100%',
        position: 'fixed',
        top: '0px',
        zIndex: 1000
      }}
    >
      <span onClick={goBack} style={{ float: 'left' }}>
        <img
          src="./content/images/back.png"
          style={{
            width: '24px',
            height: '24px'
          }}
        />
      </span>
      {...this.state.getTitleList.map(merchant => (
      <h5
        key = {merchant.id}
        style={{
          color: '#fffde5',
          marginTop: '3px',
          fontSize: '1.05rem'
        }}
      >
        {merchant.name}
      </h5>
        ))}
        {/* {titleName} */}
    </div>
    <div style={{ height: '40px' }} />
  </div>
  )
    
  }
  }
  
  const mapStateToProps = ({ authentication }: IRootState) => ({
    account: authentication.account,
    isAuthenticated: authentication.isAuthenticated
  });
  
  const mapDispatchToProps = { merchantName };
  
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Content);

// export const type = [
  
//   {
//     position: '1',
//     name: '热销'
//   },
//   {
//     position: '2',
//     name: '套餐'
//   },
//   {
//     position: '3',
//     name: '小炒'
//   },
//   {
//     position: '4',
//     name: '主食'
//   },
//   {
//     position: '5',
//     name: '酒水'
//   }
  
  
// ];


// export const food = [
//   {
//     name: '肉末茄子',
//     price: '17',
//     img: './content/images/value1.png'
//   },
//   {
//     name: '鱼香肉丝',
//     price: '14',
//     img: './content/images/value2.png'
//   },
//   {
//     name: '芹菜炒腊肉',
//     price: '14',
//     img: './content/images/value3.png'
//   },
//   {
//     name: '宫保鸡丁',
//     price: '14',
//     img: './content/images/value4.png'
//   },
//   {
//     name: '糖醋里脊',
//     price: '21',
//     img: './content/images/value5.png'
//   }
// ];

// export default function LongMenu() {
//   function spanalert(name) {
//     alert('点了：'+name);
    
//   }
//   return (
//     <div>
//       <div style={{ width: '20%', overflow: 'hidden', float: 'left' }}>
//         {type.map((name, index) => (
//           <span
//           key={name.position}
//             style={{
//               float: 'left',
//               backgroundColor: name.position === '1' ? '#ffffff' : '#f8f8f8',
//               borderRight: name.position === '1' ? 'none' : '1px solid #ececec',
//               borderLeft: name.position === '1' ? '1px solid #fe4365' : 'none',
//               width: '100%',
//               padding: '10px',
//               textAlign: 'center',
//               borderBottom: '1px solid #ececec',
//               color: '#00000095'
//             }}
//             onClick={spanalert}
            
//           >
//             {name.name}
//           </span>
//         ))}
//         <span
//           style={{
//             float: 'left',
//             height: 'calc(100vh - ' + type.length * 44 + 'px)',
//             width: '100%',
//             borderRight: '1px solid #ececec'
//           }}
//         />
//       </div>
//       <div style={{ width: '80%', overflow: 'hidden', float: 'right' }}>
//         {food.map((name, index) => (
//           <div
//           key={name.name}
//             style={{
//               padding: '10px',
//               borderBottom: '1px solid #ececec',
//               overflow: 'hidden'
//             }}
//           >
//             <span>
//               <img
//                 style={{
//                   width: '50px',
//                   height: '50px',
//                   float: 'left'
//                 }}
//                 src={name.img}
//               />
//             </span>
//             <span
//               style={{
//                 float: 'left',
//                 width: 'calc(100% - 75px)',
//                 fontSize: '1.05rem',
//                 marginLeft: '15px',
//                 textAlign: 'left'
//               }}
//             >
//               {name.name}
//             </span>
//             <span
//               style={{
//                 float: 'left',
//                 width: 'calc(100% - 75px)',
//                 fontSize: '0.93rem',
//                 marginLeft: '15px',
//                 textAlign: 'left'
//               }}
//             >
//               <span style={{ color: '#fe4365' }}>￥{name.price}</span>/份
//               <span style={{ float: 'right' }}>
//                 <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/cut.png" />
//                 <span style={{ float: 'right' }}>- 1 -</span>
//                 <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/plus.png" />
//               </span>
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
