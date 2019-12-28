import React from 'react';

import { IRootState } from 'app/shared/reducers';
import AllPrice from './allPrice';
import { connect } from 'react-redux';

export interface IContentInt extends StateProps, DispatchProps {}

export class Content extends React.Component<IContentInt> {
  state = {
    num: 0,
    sum: '',
    typeList: [],
    name1: '',
    cailist: [],
    newName: [{
      caiid: Number,
      cainame: String,
      cainum: Number, // Number,
      caiprice: String,
      url: String
    }],
    cainum: Number,
    initTypeStyle: true,
    typeNum: 0,
    menuList: [],
    menuAllCount: 0,
    iocId: '',
    merchatid: '',
    ac: Number
  };

  componentDidMount() {
    // let userId = (window.location.search.substring(1).split("&")[0]).split("=")[1]
    // let loc = (window.location.search.substring(1).split("&")[1]).split("=")[1]

  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div style= {{ width: '100%', overflow: 'auto' , float: 'right' , position: 'fixed' , top: '15%' , bottom: '6.3%' }}>
            <div
              style={{
                padding: '10px 10px 0px 5%',
                overflow: 'hidden'
              }}
            >
                <div
                  style={{
                    padding: '10px',
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
                      }} src= "http://app.yuanscore.com:8083/services/basic/api/public/getFiles/29"
                    />
                  </span>
                  <span
                    style={{
                      float: 'left',
                      width: 'calc(100% - 75px)',
                      fontSize: '1.05rem',
                      marginLeft: '15px',
                      textAlign: 'left'
                    }}
                  >
                    <span>咸酸菜</span>
                    <span style={{
                       float: 'right'
                    }}> 152.5 ￥</span>
                  </span>
                  <span
                    style={{
                      float: 'left',
                      width: 'calc(100% - 75px)',
                      fontSize: '0.93rem',
                      marginLeft: '15px',
                      textAlign: 'left'
                    }}
                  >
                    ×1
                  </span>
                </div>
            </div>
        <AllPrice />
        </div>
      </div>
    );
  }
  // <div></div>
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
)(Content);
