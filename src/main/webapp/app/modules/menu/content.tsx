import React from 'react';

import {IRootState} from 'app/shared/reducers';
import {merchantDishestype} from 'app/requests/menu/menu.reducer';
import {connect} from 'react-redux'
import {merchantName} from 'app/requests/menu/menu.reducer';
import Lowercolumn from './lowercolumn';


export interface ContentInt extends StateProps, DispatchProps {
}

export const type = [

  {
    position: '1',
    name: '热销'
  },
  {
    position: '2',
    name: '套餐'
  },
  {
    position: '3',
    name: '小炒'
  },
  {
    position: '4',
    name: '主食'
  },
  {
    position: '5',
    name: '酒水'
  }


];


export const food = [
  {
    name: '肉末茄子',
    price: '17',
    img: './content/images/value1.png'
  },
  {
    name: '鱼香肉丝',
    price: '14',
    img: './content/images/value2.png'
  },
  {
    name: '芹菜炒腊肉',
    price: '14',
    img: './content/images/value3.png'
  },
  {
    name: '宫保鸡丁',
    price: '14',
    img: './content/images/value4.png'
  },
  {
    name: '糖醋里脊',
    price: '21',
    img: './content/images/value5.png'
  }
];

// var itemDom = true;// You want to check
//
// function checkScroll() {
//   //滚动条高度+视窗高度 = 可见区域底部高度
//   var visibleBottom = window.scrollY + document.documentElement.clientHeight;
//   //可见区域顶部高度
//   var visibleTop = window.scrollY;
//
//   var centerY = itemDom.offsetTop + (itemDom.offsetHeight * 0.8);
//   var show = centerY > visibleTop && centerY < visibleBottom;
//   if (show ) {
//     // showing
//   }else{
//     // hidden
//   }
// }

export class Content extends React.Component<ContentInt> {

  state = {
    getAllOrderList: [],
    order: {
      id: Number,
      ordercode: "",
      orderstatus: "",
      sum: "",
      userid: "",
      payee: "",
      payway: "",
      payresult: "",
      paytime: "",
      concession: "",
      rebate: "",
      creator: "",
      createdate: "",
      modifier: "",
      modifierdate: "",
      modifiernum: "",
      logicdelete: "",
      other: "",
      expressCompany: "",
      expressNo: ""
    },
    type:{
      name:String,
      num:Number
    },
    typeList: [],
    list:[]
  };


  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    // this.props.menu("12","34")


    this.props.merchantDishestype((window.location.search.substring(1).split("&")[0]).split("=")[1], (window.location.search.substring(1).split("&")[1]).split("=")[1]).then(res => {
      console.log(res);
      if (res.value.data.data) {
        // let reactor = "1";
        console.log(res.value.data.data);
        this.setState({
          typeList: res.value.data.data
        });
      }
    });

  }

  render() {

    return (
      /*<div>
    {...this.state.getAllOrderList.map(order => (
      // console.log(order.id)
      <div key={order.id}>
        {order.id}
      </div>

    ))}
  </div>*/
      <div>
        <div style={{
          width: '20%',
          float: 'left',
          overflow: 'hidden',
          position: 'fixed',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          {...this.state.typeList.map((name, index) => (
            <span
              key={index}        id="pig"
              style={{
                float: 'left',
                backgroundColor: name.id === '1' ? '#ffffff' : '#f8f8f8',
                borderRight: name.id === '1'  ? 'none' : '1px solid #ececec',
                borderLeft: name.id === '1'  ? '1px solid #fe4365' : 'none',
                width: '100%',
                padding: '10px',
                textAlign: 'center',
                borderBottom: '1px solid #ececec',
                color: '#00000095'
              }}
            >
              {name.name}
          </span>
          ))}


        </div>
        <div style={{width: '80%', overflow: 'hidden', float: 'right'}}>
          {...this.state.typeList.map((name, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ececec',
                overflow: 'hidden'
              }}
            >
              <div>{name.name}</div>
              {name.dishesList.map((name, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #ececec',
                    overflow: 'hidden'
                  }}
                >
                  <span>
              <img
                style={{
                  width: '50px',
                  height: '50px',
                  float: 'left'
                }}
                src={name.image}
              />
            </span>
                  <span
                    style={{
                      float: 'left',
                      width: 'calc(100% - 75px)',
                      fontSize: '1.05rem',
                      marginLeft: '15px',
                      textAlign: 'left'
                    }}
                  >
                {name.name}
                  </span>
                  <span
                    style={{
                      float: 'left',
                      width: 'calc(100% - 75px)',
                      fontSize: '0.93rem',
                      marginLeft: '15px',
                      textAlign: 'left'
                    }}
                  >
                  <span style={{color: '#fe4365'}}>￥{name.price}</span>/份
                  <span style={{float: 'right'}}>
                  <img style={{width: '20px', height: '20px', float: 'right'}}  src="./content/images/cut.png"/>
                  <span style={{float: 'right'}}>- {} -</span>
                  <img style={{width: '20px', height: '20px', float: 'right'}} src="./content/images/plus.png"/>
                  </span>
                  </span>
                </div>
              ))}

            </div >
          ))}
          <div style={{ height:'49px',width:'100%' }}/>
        </div>
        <Lowercolumn />
      </div>
    );
  }

  // <div></div>
}
;

const mapStateToProps = ({authentication}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {merchantDishestype};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);

// import React from 'react';
// import axios from 'axios';
//
// class Axios extends React.Component{
//   constructor(props){
//     super(props);
//     this.state ={
//       list:[]
//     }
//   }
//   getData = () =>{
//     let data1 = {"Loc":"12","userId":"51"};
//     // var api = 'http://localhost:8084/services/basic/api/incomeDetails/test/loc';
//     axios.post('http://localhost:8084/services/basic/api/incomeDetails/test/loc',data1)
//     .then((response)=>{
//       if(response.data){
//         console.log(response.data);
//       }
//     })
//     .catch(function (error) {
//   });
//   }
//
// }
//
