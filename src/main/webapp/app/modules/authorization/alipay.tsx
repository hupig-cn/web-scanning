import React from 'react';
import { connect } from "react-redux";
import { sendSms } from "app/shared/reducers/authentication";

export interface IAlipayProps extends DispatchProps {
  auth_code:string;
  state:string;
}
export class Alipay extends React.Component<IAlipayProps> {
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          left: '0px',
          backgroundColor: '#fe4365'
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'auto',
            left: '0px',
            backgroundColor: '#fe4365',
            padding: '15px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              height: '100%',
              marginBottom: '20px',
              textAlign: 'center',
              borderRadius: '3px'
            }}
          >
            <div style={{ color: '#fe4365', padding: '5px', backgroundColor: '#fe436515' }}>提示</div>
            <div style={{width:'100%',height:'100%',overflow:'hidden'}}>
            <img src="./content/images/info.png" style={{float:"none",width:'200px',height:'200px',marginTop:'50px'}}/>
            </div>
            <div style={{ padding: '40px 30px' }}>
              <span>
                您已成功绑定支付宝账户{this.props.auth_code}
              </span>
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', width: '100%', height: '100%', borderRadius: '3px' }}>
            <div style={{ padding: '20px 10px 20px 10px', textAlign: 'left' }}>
              <span style={{ color: '#fe4365' }}>绑定账户：{this.props.state}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {};

const mapDispatchToProps = { sendSms };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alipay);
