import React from 'react';

export class Registersuccess extends React.Component {

  render() {
    return (
      <div style={{ textAlign: "center",marginTop: '120px' }}>
        <img src='./content/images/success.png' style={{width:'130px',height:'130px',float:"none"}}/>
        <div style={{
          width:'100%',
          fontSize: '1.5rem',
          marginTop: '35px'
        }}>注册成功</div>
        <div>
        恭喜您，成功成为《圆积分》黄金会员，点击下载APP，获取更多权益。
        </div>
        <div>下载地址：
          <a style={{color:'blue'}} href='http://www.yuanscore.com/download/yuanscore.apk'>
            <u>www.yuanscore.com</u></a></div>
      </div>
    );
  }
}

export default Registersuccess;
