import React from 'react';

import { IRootState } from 'app/shared/reducers';
import { merchantDishestype , takingOrders , takingOrdersNum , merchantOrders2 , inAllOrders } from 'app/requests/menu/menu.reducer';
import { connect } from 'react-redux';
import Lowercolumn from './lowercolumn';

export interface IContentInt2 {
  num: Number;
  sum: String;
  typeList: [];
  iocId: String;
  merchatid: String;
  name1: String;
  cailist: [];
}

export interface IContentInt extends StateProps, DispatchProps {}

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
<<<<<<< HEAD
    num: 0,
    sum: '',
=======
    num:1,
    sum:"2",
>>>>>>> branch 'code' of git@github.com:hupig-cn/web-scanning.git
    typeList: [],
    iocId: '',
    merchatid: '',
    name1: '',
    cailist: []
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    // this.props.menu("12","34")
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
            merchatid : window.location.search
              .substring(1)
              .split('&')[0]
              .split('=')[1]
          });
        }
      });
<<<<<<< HEAD
      this.props.inAllOrders(window.location.search
        .substring(1)
        .split('&')[1]
        .split('=')[1], window.location.search
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
=======

>>>>>>> branch 'code' of git@github.com:hupig-cn/web-scanning.git
  }

<<<<<<< HEAD
  handleLogin = (iocId: any, param2: any, merchatid: any, name: any) => {
    this.props.takingOrders(iocId, param2, merchatid, name);
    location.reload();
    // window.opener.location.href=window.opener.location.href;
=======
  handleLogin = (iocId: any, param2: any, merchatid: any, name: any)=> {
    this.props.takingOrders(iocId,param2,merchatid,name).then(res =>{
      if (res.value.data.data){
        this.shouldComponentUpdate();
      }
    });

    //window.opener.location.href=window.opener.location.href;
>>>>>>> branch 'code' of git@github.com:hupig-cn/web-scanning.git
  }
  handleLogin2 = (iocId: StringConstructor, param2: any, merchatid: StringConstructor) => {
    this.props.takingOrdersNum(iocId, merchatid);
    // window.opener.location.href=window.opener.location.href;
  }

  handleLogin3 = (iocId: StringConstructor, param2: any, merchatid: StringConstructor, other: any) => {
    this.props.merchantOrders2(iocId, merchatid, other);
    // window.opener.location.href=window.opener.location.href;
  }
<<<<<<< HEAD
  handleLogin4 = (iocId: StringConstructor, merchatid: StringConstructor) => {
    this.props.inAllOrders(iocId, merchatid);
    // window.opener.location.href=window.opener.location.href;
=======
  handleLogin4 = (iocId: StringConstructor, merchatid: StringConstructor)=> {
    this.props.inAllOrders(iocId,merchatid);
    //window.opener.location.href=window.opener.location.href;
  };

  checkInfo = (e)=>{ //该方法是点击checkbox调用的方法
    this.setState({
      checkFlg:e.target.checked
    });
    // this.state.checkFlg = e.target.checked;
    console.log('选中状态1：' + this.state.checkFlg);
>>>>>>> branch 'code' of git@github.com:hupig-cn/web-scanning.git
  }

  scrollToAnchor = anchorName => {
    if (anchorName.name) {
        const anchorElement = document.getElementById(anchorName.name);
        if (anchorElement) { anchorElement.scrollIntoView(); }
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
      <div style={{ position: 'relative' }}>
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
          {...this.state.typeList.map(nameMun => (
            <span
              key={nameMun.id}
              id="pig"
              style={{
                float: 'left',
                backgroundColor: nameMun.id === '1' ? '#ffffff' : '#f8f8f8',
                borderRight: nameMun.id === '1' ? 'none' : '1px solid #ececec',
                borderLeft: nameMun.id === '1' ? '1px solid #fe4365' : 'none',
                width: '100%',
                padding: '10px',
                textAlign: 'center',
                borderBottom: '1px solid #ececec',
                color: '#00000095'
              }}
            >
              <a onClick= { this.scrollToAnchor.bind(this, { ...nameMun })}>
              {nameMun.name}
              </a>
            </span>
          ))}

        </div>
        <div style= {{ width: '80%', overflow: 'auto' , float: 'right' , position: 'fixed' , left: '20%' , top: '120px' , bottom: '7%' }}>
          <div>{this.state.num}+++{this.state.sum}+++{this.state.iocId}+++{this.state.merchatid}</div>
          {...this.state.typeList.map(name => (
            <div
              key={name.id}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ececec',
                overflow: 'hidden'
              }}
            >
              <div id={ name.name }>{ name.name }</div>
              { name.list.map(newName => (
                <div
                  key={newName.id}
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
                      src={newName.url}
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
                    {newName.cainame}
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
                    <span style={{ color: '#fe4365' }}>￥{newName.caiprice}</span>/份
                    <span style={{ float: 'right' }}>
                      <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/cut.png"
                      onClick={ takingOrders.bind(this, this.state.iocId, newName.cainum + 1, this.state.merchatid, newName.name)}
                      />
                      <span style={{ float: 'right' }}>- {newName.cainum} -</span>
                      <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/plus.png"
                      onClick={ ()=>this.handleLogin(this.state.iocId,parseInt(newName.cainum)+1,this.state.merchatid,newName.cainame)}
                      />
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

<<<<<<< HEAD
=======


>>>>>>> branch 'code' of git@github.com:hupig-cn/web-scanning.git
const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { merchantDishestype , takingOrders, takingOrdersNum, inAllOrders, merchantOrders2 };

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
