import React from 'react';

import { IRootState } from 'app/shared/reducers';
import { merchantDishestype , inAllOrders, takingOrders2 , takingOrders3 } from 'app/requests/menu/menu.reducer';
import { connect } from 'react-redux';
import Lowercolumn from './lowercolumn';

export interface IContentInt extends StateProps, DispatchProps {}

export class Content extends React.Component<IContentInt> {
  state = {
    num: 0,
    sum: '',
    typeList: [],
    name1: '',
    cailist: [],
    newName: [{
      caiid: Number,
      cainame: String,
      cainum: Number, // Number,
      caiprice: String,
      url: String
    }],
    cainum: Number,
    initTypeStyle: true,
    typeNum: 0,
    menuList: [],
    menuAllCount: 0,
    iocId: '',
    merchatid: '',
    ac: Number
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    this.props.inAllOrders(
      window.location.search
      .substring(1)
      .split('&')[0]
      .split('=')[1],
    window.location.search
      .substring(1)
      .split('&')[1]
      .split('=')[1])
    // @ts-ignore
    .then(res => {
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
        .split('=')[1])
      // @ts-ignore
      .then(res => {
        // console.log(res);
        if (res.value.data.data) {
          // let reactor = "1";
          // console.log(res.value.data.data);
          this.setState({
            typeList: res.value.data.data,
            menuAllCount: res.value.data.totalElements,
            iocId: window.location.search
                  .substring(1)
                  .split('&')[1]
                  .split('=')[1],
            merchatid: window.location.search
                  .substring(1)
                  .split('&')[0]
                  .split('=')[1]
                  });
        }
      });
  }

  scrollToAnchor (anchorName, typeIndex, e) {
    // console.log(anchorName);
    // console.log(typeIndex);
    // console.log(this.state.typeList[(anchorName.id-1)])
    if (anchorName.name) {
        const anchorElement = document.getElementById(anchorName.name);
        if (anchorElement) { anchorElement.scrollIntoView(); }
        const num = typeIndex;
        const douType = false ;
        const _systemType_ = this.state.initTypeStyle = false;
        const _typeNumber_ = this.state.typeNum = typeIndex;
        this.setState({
          _systemType_ : douType ,
          _typeNumber_ : num
        });
        // document.getElementById(anchorName.id).style.background = '#ffffff';
        // document.getElementById(anchorName.id).style.borderRight = 'none';
        // document.getElementById(anchorName.id).style.borderLeft = '1px solid #fe4365';
    }
  }
  clickCut(name, nameNum , indexs, e) {
    // this.setState({
    //   e : name+1
    // })
    // console.log('----------', this.state);
    // console.log(this.state.typeList[(indexs[0])]['list']);
    if (parseInt(this.state.typeList[(indexs[0])]['list'][(indexs[1])]['cainum'] , 10) > 0) {
      const newSum = ((parseFloat(this.state.sum)) * 1000 - (parseFloat(name.caiprice)) * 1000) / 1000;
      const newAllNum = this.state.num - 1;
      const newTotals = parseInt(this.state.typeList[(indexs[0])]['list'][(indexs[1])]['cainum'] , 10) - 1;
      const _tmp_ = this.state.typeList;
      const _stateData_ = this.state;
      const _menuList_ = this.state.menuList = [];
      _stateData_.sum = '' + newSum;
      _tmp_[(indexs[0])]['list'][(indexs[1])]['cainum'] = newTotals;
      _stateData_.num = newAllNum;
      // _tmp_.sum=newSum;
      this.setState({
        typeList : _tmp_,
        lastSum : _stateData_.sum,
        lastNum : _stateData_.num
      });
      // for (let typeCount = 0; typeCount < this.state.typeList.length; typeCount++) {
      //   console.log(typeCount);
      //   for (let index = 0; index < this.state.typeList[typeCount]['list'].length; index++) {
      //     // console.log(this.state.typeList[typeCount]['list'][index]['cainum']);
      //     if ( this.state.typeList[typeCount]['list'][index]['cainum'] > 0) {
      //       // console.log(this.state.typeList[typeCount]['list'][index]);
      //       _menuList_.push(this.state.typeList[typeCount]['list'][index]);
      //     }
      //   }
      // }
      for (const [typeOneIndex, typeOneCount] of this.state.typeList.entries()) {
        // console.log(this.state.typeList[typeOneIndex]);
        for (const [typeTowIndex, typeSecCount] of this.state.typeList[typeOneIndex]['list'].entries()) {
          if (this.state.typeList[typeOneIndex]['list'][typeTowIndex]['cainum'] > 0) {
            _menuList_.push(this.state.typeList[typeOneIndex]['list'][typeTowIndex]);
          }
        }
      }
      this.setState({
        newMenuList: _menuList_
      });
      // console.log(this.state.menuList);
    }
    // console.log(this.state.typeList);
    // console.log('2222222222222', this.state);
  }
    clickPlus(name, nameNum, indexs, e) {
      // this.setState({
      //   e : name+1
      // })
      // console.log('----------', this.state);
      const newSum = ((parseFloat(this.state.sum)) * 1000 + (parseFloat(name.caiprice)) * 1000) / 1000;
      const newAllNum = this.state.num + 1;
      const newTotals = parseInt(this.state.typeList[(indexs[0])]['list'][(indexs[1])]['cainum'], 10) + 1;
      const _tmp_ = this.state.typeList;
      const _stateData_ = this.state;

      const _menuList_ = this.state.menuList = [];
      _stateData_.sum = '' + newSum;
      _tmp_[(indexs[0])]['list'][(indexs[1])]['cainum'] = newTotals;
      _stateData_.num = newAllNum;
      this.setState({
        typeList: _tmp_,
        lastSum: _stateData_.sum,
        lastNum: _stateData_.num
      });
      for (const [typeOneIndex, typeOneCount] of this.state.typeList.entries()) {
        // console.log(this.state.typeList[typeOneIndex]);
        for (const [typeTowIndex, typeSecCount] of this.state.typeList[typeOneIndex]['list'].entries()) {
          if (this.state.typeList[typeOneIndex]['list'][typeTowIndex]['cainum'] > 0) {
            _menuList_.push(this.state.typeList[typeOneIndex]['list'][typeTowIndex]);
          }
        }
      }
      // console.log(this.state.menuList);
      this.setState({
        newMenuList: _menuList_
      });
    }
    // let "shopid_1_categoryid_2_dish_3" = newTotals;
    // TODO cookie TODO this.state
    // _newName_["cainum"] = parseInt(nameNum) + 1;
    // this.setState({
    //   newName : _newName_
    // });
    // console.log(parseInt(nameNum)+1);

    handleLogin = () => {
      this.props.takingOrders3(this.state.merchatid, this.state.iocId, this.state.menuList)
      // @ts-ignore
      .then(res => {
        // console.log(res);
        if (res.value.data.data) {
          // let reactor = "1";
          // console.log(res.value.data.data);
          this.setState({
            ac: res.value.data.data
          });
        }
      });
      window.location.replace(
        'http://localhost:9000/?id=20&sum=' + `${this.state.sum}` + '&order=' + `${this.state.ac}`
      );
    }
      //  return <Pay2 id={this.props.iocId} userid="" auth_code={this.props.auth_code} wechat="" sum={this.state.sum}/>
// <Pay2 id={this.props.iocId} userid="" auth_code="" wechat={this.props.wechat} sum={this.state.sum}/>
    // handleLogin = () => {
    //   this.props.takingOrders2(this.props.merchatid, this.props.iocId, '388', this.state.sum, this.state.menuList);
    // }
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            width: '20%',
            float: 'left',
            overflow: 'auto',
            position: 'fixed',
            zIndex: 1000,
            top: '12.5%',
            textAlign: 'center'
          }}
        >
          {...this.state.typeList.map((nameMun, typeIndex) => (
            <span
              key={nameMun.id}
              id={nameMun.id}
              style={{
                float: 'left',
                backgroundColor: this.state.initTypeStyle ? (typeIndex === 0 ? '#f8f8f8' : '#ffffff') : (typeIndex === this.state.typeNum ? '#f8f8f8' : '#ffffff'),
                borderRight: this.state.initTypeStyle ? (typeIndex === 0 ? 'none' : '1px solid #ececec') : (typeIndex === this.state.typeNum ? 'none' : '1px solid #ececec'),
                borderLeft: this.state.initTypeStyle ? (typeIndex === 0 ? '1px solid #fe4365' : 'none') : (typeIndex === this.state.typeNum ? '1px solid #fe4365' : 'none'),
                width: '100%',
                padding: '10px',
                textAlign: 'center',
                borderBottom: '1px solid #ececec',
                color: '#00000095'
              }}
            >
              <a onClick= { this.scrollToAnchor.bind(this, { ...nameMun } , typeIndex)}>
              {nameMun.name}
              </a>
            </span>
          ))}
        </div>
        <div style= {{ width: '80%', overflow: 'auto' , float: 'right' , position: 'fixed' , left: '20%' , top: '12.5%' , bottom: '6.3%', borderLeft: '1px solid #ececec' }}>
          {/* <div>{this.state.num}+++{this.state.sum}+++{this.state.iocId}+++{this.state.merchatid}</div> */}
          {...this.state.typeList.map((item, index) => (
            <div
              key={item.name}
              style={{
                padding: '10px 10px 0px 10px',
                borderBottom: '1px solid #ececec',
                overflow: 'hidden'
              }}
            >
              <div id={ item.name }>{ item.name }</div>
              { item.list.map((newName, inx) => (
                <div
                  key={inx}
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
                      <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/plus.png"
                      onClick={this.clickPlus.bind(this, newName, parseInt(newName.cainum, 10), [index, inx])}
                          // ()=>this.handleLogin(this.state.iocId,parseInt(newName.cainum)+1,this.state.merchatid,newName.cainame)}
                        />
                        {/* {
                        //console.log(newName)
                      }shopid_1_categoryid_2_dish_3 */}
                   <span style={{ float: 'right' }}>- {newName.cainum} -</span> {/*  {shopid10}  _{index} _ {inx} */}
                      <img style={{ width: '20px', height: '20px', float: 'right' }} src="./content/images/cut.png"
                      onClick = { this.clickCut.bind(this, newName, parseInt(newName.cainum, 10), [index, inx])} />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Lowercolumn num={this.state.num} sum={this.state.sum} menuList={this.state.menuList} handleLogin={this.handleLogin}/>
        {/* {console.log(this.state.typeList)} */}
      </div>
    );
  }
  // <div></div>
}
const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});
const mapDispatchToProps = { merchantDishestype , takingOrders2, inAllOrders, takingOrders3 };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
