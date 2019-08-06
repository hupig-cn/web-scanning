import React from 'react';
import { connect } from 'react-redux';
import { bindingWeChat } from 'app/entities/basic/linkuser/linkuser.reducer';
import { deleteUsers } from 'app/shared/reducers/authentication';

export interface IWechatProps extends DispatchProps {
  code: string;
  userid: string;
}
export class Wechat extends React.Component<IWechatProps> {
  state = { message: '' };
  componentDidMount() {
    this.props
      .bindingWeChat(this.props.code, this.props.userid)
      // @ts-ignore
      .then(key => {
        if (!isNaN(key.value.data)) {
          if (key.value.data.toString() !== '0') {
            this.props
              .deleteUsers(key.value.data)
              // @ts-ignore
              .then(val => {
                if (val.value.data === '成功') {
                  this.setState({ message: '绑定微信成功' });
                } else {
                  this.setState({ message: '绑定出错' });
                }
              });
          } else {
            this.setState({ message: '绑定微信成功' });
          }
        } else {
          this.setState({ message: key.value.data });
        }
      });
  }

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
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              <img src="./content/images/info.png" style={{ float: 'none', width: '200px', height: '200px', marginTop: '50px' }} />
            </div>
            <div style={{ padding: '40px 30px' }}>
              <span>{this.state.message}</span>
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', width: '100%', height: '100%', borderRadius: '3px' }}>
            <div style={{ padding: '20px 10px 20px 10px', textAlign: 'left' }}>
              <span style={{ color: '#fe4365' }}>绑定账户</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {};

const mapDispatchToProps = { bindingWeChat, deleteUsers };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wechat);
