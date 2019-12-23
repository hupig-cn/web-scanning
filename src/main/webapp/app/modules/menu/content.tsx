import React from 'react';

import {IRootState} from 'app/shared/reducers';
import {merchantDishestype} from 'app/requests/menu/menu.reducer';
import {takingOrders} from 'app/requests/menu/menu.reducer';
import {takingOrdersNum} from 'app/requests/menu/menu.reducer';
import {merchantOrders2} from 'app/requests/menu/menu.reducer';
import {inAllOrders} from 'app/requests/menu/menu.reducer';
import {connect} from 'react-redux';
import Lowercolumn from './lowercolumn';

export interface IContentInt2 {
  num:Number;
  sum:String;
  typeList: [];
  iocId:String;
  merchatid:String;
  name1:String;
  cailist:[];
}


export interface IContentInt extends StateProps, DispatchProps {}

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

export class Content extends React.Component<IContentInt> {
  state = {
    num:0,
    sum:"",
    typeList: [],
    iocId:"",
    merchatid:"",
    name1:"",
    cailist:[]
  };


  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    // this.props.menu("12","34")
    this.props
      .merchantDishestype(
        window.location.search
          .substring(1)
          .split('&')[0]
          .split('=')[1],
        window.location.search
          .substring(1)
          .split('&')[1]
          .split('=')[1]
      )
      .then(res => {
        // console.log(res);
        if (res.value.data.data) {
          // let reactor = "1";
          // console.log(res.value.data.data);
          this.setState({
            typeList: res.value.data.data,
            iocId: window.location.search
              .substring(1)
              .split('&')[1]
              .split('=')[1],
            merchatid:window.location.search
              .substring(1)
              .split('&')[0]
              .split('=')[1]
          });
        }
      });
      this.props.inAllOrders(window.location.search
        .substring(1)
        .split('&')[1]
        .split('=')[1],window.location.search
        .substring(1)
        .split('&')[0]
        .split('=')[1]).then(res => {
        // console.log(res);
        if (res.value.data.data) {
          // let reactor = "1";
          // console.log(res.value.data.data);
          this.setState({
            num: res.value.data.totalElements,
            sum: res.value.data.message
          });
        }
      });
  }

  handleLogin = (iocId: any, param2: any, merchatid: any, name: any)=> {
    this.props.takingOrders(iocId,param2,merchatid,name);
    location.reload();
    //window.opener.location.href=window.opener.location.href;
  }
  handleLogin2 = (iocId: StringConstructor, param2: any, merchatid: StringConstructor)=> {
    this.props.takingOrdersNum(iocId,merchatid);
    //window.opener.location.href=window.opener.location.href;
  }

  handleLogin3 = (iocId: StringConstructor, param2: any, merchatid: StringConstructor, other: any)=> {
    this.props.merchantOrders2(iocId,merchatid,other);
    //window.opener.location.href=window.opener.location.href;
  }
  handleLogin4 = (iocId: StringConstructor, merchatid: StringConstructor)=> {
    this.props.inAllOrders(iocId,merchatid);
    //window.opener.location.href=window.opener.location.href;
  }

  scrollToAnchor = (anchorName) => {
    var aa = anchorName.nativeEvent.target.innerText;
    if (aa) {
        let anchorElement = document.getElementById(aa);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
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
      <div style={{position:'relative'}}>
        <div
          style={{
            width: '20%',
            float: 'left',
            overflow: 'hidden',
            position: 'fixed',
            zIndex: 1000,
            textAlign: 'center'
          }}
        >
          {...this.state.typeList.map((name, index) => (
            <span
              key={index}
              id="pig"
              style={{
                float: 'left',
                backgroundColor: name.id === '1' ? '#ffffff' : '#f8f8f8',
                borderRight: name.id === '1' ? 'none' : '1px solid #ececec',
                borderLeft: name.id === '1' ? '1px solid #fe4365' : 'none',
                width: '100%',
                padding: '10px',
                textAlign: 'center',
                borderBottom: '1px solid #ececec',
                color: '#00000095'
              }}
            >
              <a onClick={({...name})=>this.scrollToAnchor({...name})}>
              {name.name}
              </a>
            </span>
          ))}
          {/*<span*/}
            {/*style={{*/}
              {/*float: 'left',*/}
              {/*height: 'calc(100vh - ' + this.state.typeList.length * 44 + 'px)',*/}
              {/*width: '100%',*/}
              {/*position: 'fixed',*/}
              {/*borderRight: '1px solid #ececec'*/}
            {/*}}*/}
          {/*/>*/}
        </div>
        <div style={{ width: '80%', overflow: 'auto', float: 'right',position:'fixed',left:'20%',top:'120px',bottom:'7%' }}>
          <div>{this.state.num}+++{this.state.sum}+++{this.state.iocId}+++{this.state.merchatid}</div>
          {...this.state.typeList.map((name, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ececec',
                overflow: 'hidden'
              }}
            >
              <div id={name.name}>{name.name}</div>
              {name.list.map((name, index) => (
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
                      src={name.url}
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
                    {name.cainame}
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
                    <span style={{ color: '#fe4365' }}>￥{name.caiprice}</span>/份
                    <span style={{ float: 'right' }}>
                      <img style={{ width: '20px', height: '20px', float: 'right' }}  src="./content/images/cut.png" onClick={()=>takingOrders(this.state.iocId,name.cainum+1,this.state.merchatid,name.name)}/>
                      <span style={{ float: 'right' }}>- {name.cainum} -</span>
                      <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/plus.png" onClick={()=>this.handleLogin(this.state.iocId,parseInt(name.cainum)+1,this.state.merchatid,name.cainame)}/>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Lowercolumn num={this.state.num} sum={this.state.sum}/>
      </div>
    );
  }

  // <div></div>
}


const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { merchantDishestype ,takingOrders,takingOrdersNum,inAllOrders,merchantOrders2};

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
