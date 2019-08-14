import React from 'react';
import { connect } from 'react-redux';
import Title from './title';

export interface IInfoProp extends StateProps, DispatchProps {
  message: any;
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
          backgroundColor: '#fe4365',
          marginTop: '-20px'
        }}
      >
        <Title />
        <div
          style={{
            width: '100%',
            height: 'auto',
            left: '0px',
            backgroundColor: '#fe4365'
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
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              <img
                src="./content/images/infos.png"
                style={{
                  float: 'none',
                  width: '93%',
                  height: 'auto',
                  marginTop: '3%',
                  borderRadius: '12px 12px 0px 0px'
                }}
              />
            </div>
            <div
              style={{
                backgroundColor: 'rgba(254, 67, 101, 0.082)',
                width: '93%',
                margin: '0 auto',
                marginBottom: '3%',
                padding: '5px',
                borderRadius: '0px 0px 15px 15px'
              }}
            >
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
