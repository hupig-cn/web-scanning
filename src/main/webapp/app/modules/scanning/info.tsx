import React from 'react';
import { connect } from 'react-redux';

export interface IInfoProp extends StateProps, DispatchProps {
  message: string;
}

export class Info extends React.Component<IInfoProp> {
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
              <span>{this.props.message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
