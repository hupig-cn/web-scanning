import React from 'react';
import { connect, Provider } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';

import { sendSms, register } from 'app/shared/reducers/authentication';
import { login } from 'app/shared/reducers/authentication';
import { toast } from 'react-toastify';
import ReactDOM from "react-dom";
import Registersuccess from './registersuccess';

export interface IRegisterProps extends StateProps, DispatchProps {}

const names = (key) => {
  let temp = window.location.hash;
  if ('id' === key){
    return temp.substring(temp.indexOf('=') + 1,temp.indexOf('&'));
  }else{
    return temp.substring(temp.lastIndexOf('=')+1);
  }
};

export class Register extends React.Component<IRegisterProps> {
  state = { time: 10, btnDisable: false, btnContent: '发送验证码', backgroundColor: '#fe4365' };
  // window.location.hash.substring(window.location.hash.indexOf('=') + 1)
  componentDidUpdate(prevProps: IRegisterProps, prevState) {
  }
  handleSubmit = (event, errors, { phone, code, password, repassword, agreement }) => {
    if (!agreement) {
      toast.info('提示：请先阅读并同意《用户协议》。');
    } else if (password !== repassword) {
      toast.info('提示：两次输入的密码不一致，请检查后提交。');
    } else if (phone.length !== 11) {
      toast.info('提示：手机号输入有误。');
    } else if (code.length !== 6) {
      toast.info('提示：验证码输入错误。');
    } else if (password.trim().length < 1) {
      toast.info('提示：密码不能为空。');
    } else {
      this.handleRegister(phone, code, password);
    }
  };
  handleSend = phone => {
    this.handleSendCode(phone);
  };
  handleSendCode = phone => {
    const result = this.props.sendSms(phone);
    // @ts-ignore
    result.then(res => {
      if (res.value.data.toString() === '发送成功') {
        toast.success('已发送。');
      } else {
        // tslint:disable-next-line: no-multi-spaces
        toast.error('错误：' + res.value.data.toString());
      }
    });
  };
  handleRegister = (phone, code, password) => {
    const result = this.props.register(phone, password, code);
    // @ts-ignore
    result.then(res => {
      if (!isNaN(res.value.data)) {
          ReactDOM.render(
              <Registersuccess />,
            document.getElementsByClassName('jh-body').item(0)
          );
      } else {
        // tslint:disable-next-line: no-multi-spaces
        toast.error('错误：' + res.value.data.toString());
      }
    });
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };

  testss = () => {
      ReactDOM.render(
        <Registersuccess />,
        document.getElementsByClassName('jh-body').item(0));

  };

  render() {
    // tslint:disable-next-line: one-variable-per-declaration
    let timeChange,
      ti = this.state.time;
    const clock = () => {
      if (ti > 0) {
        ti = ti - 1;
        this.setState({ time: ti, btnContent: '（' + ti + 's）' });
      } else {
        clearInterval(timeChange);
        this.setState({ btnDisable: false, time: 10, btnContent: '发送验证码', backgroundColor: '#fe4365' });
      }
    };
    const sendCode = () => {
      // @ts-ignore
      const phone = document.getElementById('register-phone').value;
      if (phone.length !== 11) {
        toast.info('提示：手机号输入有误。');
      } else {
        this.handleSend(phone);
        this.setState({ btnDisable: true, btnContent: '（10s）', backgroundColor: '#cccccc' });
        timeChange = setInterval(clock, 1000);
      }
    };
    return (
      <div style={{textAlign: "left"}}>
        <AvForm onSubmit={this.handleSubmit}>
            <div style={{
              width:'100%',
              textAlign:"center",
              padding: '10px',
              fontSize: '1.2rem',
              borderBottom: '1px solid #00000015'
            }}>注册账户</div>
          <ModalBody>
            <Row>
              <Col md="12">
                <button
                  style={{
                    float: 'right',
                    backgroundColor: this.state.backgroundColor,
                    color: '#fffde5',
                    borderRadius: '0.25rem',
                    border: '0px',
                    width: '40%',
                    marginTop: '30px',
                    height: '40px'
                  }}
                  onClick={sendCode}
                  type="button"
                  disabled={this.state.btnDisable}
                >
                  {this.state.btnContent}
                </button>
                <AvField
                  name="phone"
                  id="register-phone"
                  label={'手机号'}
                  placeholder={'请输入手机号'}
                  required
                  errorMessage="手机号不能为空!"
                  autoFocus
                  style={{ width: '55%' }}
                />
                <AvField
                  name="code"
                  label={<span style={{ float: 'left', marginTop: '7px' }}>验证码：</span>}
                  placeholder={'请输入验证码'}
                  required
                  errorMessage="验证码不能为空!"
                  style={{ width: '70%', float: 'right' }}
                />
                <AvField
                  name="password"
                  type="password"
                  label={<span style={{ float: 'left', marginTop: '7px' }}>密码：</span>}
                  placeholder={'请输入密码'}
                  required
                  errorMessage="密码不能为空!"
                  style={{ width: '70%', float: 'right' }}
                />
                <AvField
                  name="repassword"
                  type="password"
                  label={<span style={{ float: 'left', marginTop: '7px' }}>重复密码：</span>}
                  placeholder={'请重复输入密码'}
                  required
                  errorMessage="重复密码不能为空!"
                  style={{ width: '70%', float: 'right' }}
                />
                <AvField
                  name="share"
                  type="password"
                  label={<span style={{ float: 'left', marginTop: '7px' }}>推荐人：</span>}
                  placeholder={names('name')}
                  required
                  readonly
                  disabled
                  errorMessage=" "
                  style={{ width: '70%', float: 'right' }}
                />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="agreement" />
                    我已阅读并同意<u>《用户协议》</u>
                  </Label>
                </AvGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button style={{ width: '50%' }} onClick={this.handleClose} tabIndex="1">
              取消
            </Button>{' '}
            <Button style={{ backgroundColor: '#fe4365', border: '1px solid #fe4365', width: '50%' }} type="submit">
              注册
            </Button>
          </ModalFooter>
        </AvForm>
          <button type='button' onClick={this.testss}>测试按钮</button>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { sendSms, register, login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
