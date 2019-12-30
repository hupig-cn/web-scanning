import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

export interface IContentInt extends StateProps, DispatchProps {}

export class Title extends React.Component<IContentInt> {
  // export const titleName =  '某某商家';
  state = {
    getTitleList: []
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]
    // @ts-ignore
    // this.props.menu("12","34")
  }

  render() {
    function goBack() {
      history.go(-1);
    }

    return (
      <div>
        <div
          style={{
            backgroundColor: '#fe4365',
            height: '5%',
            textAlign: 'center',
            padding: '7px',
            width: '100%',
            position: 'fixed',
            top: '0px',
            zIndex: 1000
          }}
        >
          <span onClick={goBack} style={{ float: 'left' }}>
            <img
              src="./content/images/back.png"
              style={{
                width: '24px',
                height: '24px'
              }}
            />
          </span>
            <h5
              style={{
                color: '#fffde5',
                marginTop: '3px',
                fontSize: '1.05rem'
              }}
            >
              订单详情
            </h5>
          {/* {titleName} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title);
