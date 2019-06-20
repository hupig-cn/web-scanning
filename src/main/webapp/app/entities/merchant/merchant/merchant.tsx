import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './merchant.reducer';
import { IMerchant } from 'app/shared/model/merchant/merchant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMerchantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IMerchantState = IPaginationBaseState;

export class Merchant extends React.Component<IMerchantProps, IMerchantState> {
  state: IMerchantState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { merchantList, match } = this.props;
    return (
      <div>
        <h2 id="merchant-heading">
          <Translate contentKey="scanningApp.merchantMerchant.home.title">Merchants</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="scanningApp.merchantMerchant.home.createLabel">Create new Merchant</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('userid')}>
                    <Translate contentKey="scanningApp.merchantMerchant.userid">Userid</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('merchantphoto')}>
                    <Translate contentKey="scanningApp.merchantMerchant.merchantphoto">Merchantphoto</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('name')}>
                    <Translate contentKey="scanningApp.merchantMerchant.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('businessid')}>
                    <Translate contentKey="scanningApp.merchantMerchant.businessid">Businessid</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('state')}>
                    <Translate contentKey="scanningApp.merchantMerchant.state">State</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('address')}>
                    <Translate contentKey="scanningApp.merchantMerchant.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('province')}>
                    <Translate contentKey="scanningApp.merchantMerchant.province">Province</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('city')}>
                    <Translate contentKey="scanningApp.merchantMerchant.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('county')}>
                    <Translate contentKey="scanningApp.merchantMerchant.county">County</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('concession')}>
                    <Translate contentKey="scanningApp.merchantMerchant.concession">Concession</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('rebate')}>
                    <Translate contentKey="scanningApp.merchantMerchant.rebate">Rebate</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('weight')}>
                    <Translate contentKey="scanningApp.merchantMerchant.weight">Weight</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('creator')}>
                    <Translate contentKey="scanningApp.merchantMerchant.creator">Creator</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('createdate')}>
                    <Translate contentKey="scanningApp.merchantMerchant.createdate">Createdate</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('modifier')}>
                    <Translate contentKey="scanningApp.merchantMerchant.modifier">Modifier</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('modifierdate')}>
                    <Translate contentKey="scanningApp.merchantMerchant.modifierdate">Modifierdate</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('modifiernum')}>
                    <Translate contentKey="scanningApp.merchantMerchant.modifiernum">Modifiernum</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('logicdelete')}>
                    <Translate contentKey="scanningApp.merchantMerchant.logicdelete">Logicdelete</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('other')}>
                    <Translate contentKey="scanningApp.merchantMerchant.other">Other</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {merchantList.map((merchant, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${merchant.id}`} color="link" size="sm">
                        {merchant.id}
                      </Button>
                    </td>
                    <td>{merchant.userid}</td>
                    <td>{merchant.merchantphoto}</td>
                    <td>{merchant.name}</td>
                    <td>{merchant.businessid}</td>
                    <td>{merchant.state}</td>
                    <td>{merchant.address}</td>
                    <td>{merchant.province}</td>
                    <td>{merchant.city}</td>
                    <td>{merchant.county}</td>
                    <td>{merchant.concession}</td>
                    <td>{merchant.rebate}</td>
                    <td>{merchant.weight}</td>
                    <td>{merchant.creator}</td>
                    <td>{merchant.createdate}</td>
                    <td>{merchant.modifier}</td>
                    <td>{merchant.modifierdate}</td>
                    <td>{merchant.modifiernum}</td>
                    <td>{merchant.logicdelete ? 'true' : 'false'}</td>
                    <td>{merchant.other}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${merchant.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${merchant.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${merchant.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ merchant }: IRootState) => ({
  merchantList: merchant.entities,
  totalItems: merchant.totalItems,
  links: merchant.links,
  entity: merchant.entity,
  updateSuccess: merchant.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Merchant);
