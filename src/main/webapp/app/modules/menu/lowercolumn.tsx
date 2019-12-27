import React from 'react';
import MenuCart from './menuCart';
import { hideLoading } from 'react-redux-loading-bar';

export interface ILongMenuProps {
  num: number;
  sum: String;
  menuList: any[];
  handleLogin: Function;
}

class LongMenu extends React.Component<ILongMenuProps> {

  state = {
    hide: true,
    menuList: []
  };
  // this.props.takingOrders2(this.props.merchantId, this.props.iocId, '388', this.props.sum, this.state.menuList);
  handleSubmit = () => {
      this.props.handleLogin();
  };
  constructor(props) {
    super(props);

    // console.log(this.props.num);
    // console.log(this.props.sum);
  }

  kanCaiDan(hideData, num, e) {
    if (num > 0) {
      const _changeHide_ = this.state;
      const changeHide = (hideData ? false : true);
      _changeHide_.hide = changeHide;
      this.setState({
        sureHide: _changeHide_.hide
      });
    }
    // console.log(this.props.menuList);
  }
  render() {
    function goBack() {
      history.go(-1);
    }
    return (
      <div >
        <div style={{
          width: '100%',
          height: '25%',
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.50)',
          position: 'fixed',
          top: this.state.hide ? '112.5%' : '12.5%',
          bottom: '50%',
          left: '0px'
        }}
          onClick={this.kanCaiDan.bind(this, this.state.hide)}
        />
        <MenuCart menuList={this.props.menuList} hide={this.state.hide} />
        <div
          style={{
            position: 'fixed',
            bottom: '0px',
            zIndex: 1000,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
            height: '6.3%',
            textAlign: 'center'
          }}
        >
          <span
            onClick={this.handleSubmit}
            style={{
              height: '100%',
              float: 'right',
              backgroundColor: '#fe4365',
              color: '#fffde5',
              display: 'block',
              padding: '12px 25px 15px 25px'
            }}
          >
            提交订单
      </span>
          <img
            onClick={this.kanCaiDan.bind(this, this.state.hide, this.props.num)}
            style={{
              float: 'left',
              width: '30px',
              height: '55%',
              margin: '8px 15px 15px 15px'
            }}
            src="./content/images/num.png"
          />
          <span
            style={{
              color: '#fffde5',
              backgroundColor: '#fe4365',
              float: 'left',
              width: '20px',
              height: '20px',
              borderRadius: '50px',
              fontSize: '0.1em',
              position: 'absolute',
              left: '35px',
              fontFamily: 'SimHei'
            }}
          >
            {this.props.num}
          </span>
          <h5
            style={{
              color: '#fffde5',
              marginTop: '15px',
              fontSize: '1.05rem',
              float: 'left'
            }}
          >
            ￥{this.props.sum}
          </h5>
          {/* { console.log(this.props.menuList)} */}
        </div>
      </div>
    );
  }
}

export default LongMenu;
