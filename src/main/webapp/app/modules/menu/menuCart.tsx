import React from 'react';

export interface IMenuCartProps {
  menuList: any[];
  hide: boolean;
}

class MenuCart extends React.Component<IMenuCartProps> {

  state = {
    hide: Boolean,
    menuList: []
  }
  constructor(props) {
    super(props);

  }
  backMenu() {

  }
  render() {

    return (
      <div>
        {/* <div style={{
          width: '100%',
          height: '25%',
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.50)',
          position: 'fixed',
          top: this.props.hide ? '112.5%' : '12.5%',
          bottom: '50%',
          left: '0px'
        }}
        onClick={this.backMenu.bind(this)}
        >
        </div> */}

        <div style={{
          width: '100%',
          height: '5%',
          zIndex: 1000,
          background: '#C8C7C5',
          position: 'fixed',
          top: this.props.hide ? '137.5%' : '37.5%',
          left: '0px'
        }}>

        </div>

        <div style={{
          width: '100%',
          height: '51.2%',
          zIndex: 1000,
          background: 'rgba(225, 225, 225, 1)',
          position: 'fixed',
          overflowY: 'scroll',
          top: this.props.hide ? '137.5%' : '42.5%',
          left: '0px'
        }}>
          {...this.props.menuList.map((item, index) => (
            <div
              key={index}
              style={{
                height: '70px',
                width: '100%',
                padding: '10px 30px 10px 30px',
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
                  src={item.url}
                />
                {/* {console.log(item.url)} */}
              </span>
              <span
                style={{
                  float: 'left',
                  width: '50%',
                  fontSize: '1.05rem',
                  marginLeft: '15px',
                  textAlign: 'left'
                }}
              >
                {item.cainame}
                {/* {console.log(item.cainame)} */}
              </span>
              <span style={{
                float: 'right'
              }}>
                已点 {item.cainum} 份
              </span>
              <span
                style={{
                  float: 'left',
                  width: '50%',
                  fontSize: '0.93rem',
                  marginLeft: '15px',
                  textAlign: 'left'
                }}
              >
                <span style={{ color: '#fe4365' }}>￥{item.caiprice}</span>/份
        </span>
              <span style={{
                float: 'right'
              }}>
                <span style={{
                  color: '#fe4365',
                  width: '50%',
                  fontSize: '0.93rem',
                  textAlign: 'left'
                }}>共 {((parseFloat(item.cainum) * 100) * parseFloat(item.caiprice) * 100) / 10000} ￥</span> </span>

            </div>
          )

          )}

        </div>
      </div>

    );
  }
}
export default MenuCart;