import React from 'react';
import { merchantName } from 'app/requests/menu/menu.reducer';
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

    this.props
      .merchantName(
        window.location.search
          .substring(1)
          .split('&')[0]
          .split('=')[1]
      )
      // @ts-ignore
      .then(res => {
        // console.log(res);
        if (res.value.data.data) {
          // let reactor = "1";
          // console.log(res.value.data.data)
          this.setState({
            getTitleList: res.value.data.data
          });
        }
      });
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
            height: '40px',
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
          {...this.state.getTitleList.map(merchant => (
            <h5
              key={merchant.id}
              style={{
                color: '#fffde5',
                marginTop: '3px',
                fontSize: '1.05rem'
              }}
            >
              {merchant.name}
            </h5>
          ))}
          {/* {titleName} */}
        </div>
        <div style={{ height: '40px' }} />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { merchantName };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title);
