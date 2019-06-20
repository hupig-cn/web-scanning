import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './linkuser.reducer';
import { ILinkuser } from 'app/shared/model/basic/linkuser.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILinkuserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ILinkuserState = IPaginationBaseState;

export class Linkuser extends React.Component<ILinkuserProps, ILinkuserState> {
  state: ILinkuserState = {
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
    const { linkuserList, match } = this.props;
    return (
      <div>
        <h2 id="linkuser-heading">
          <Translate contentKey="scanningApp.basicLinkuser.home.title">Linkusers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="scanningApp.basicLinkuser.home.createLabel">Create new Linkuser</Translate>
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
                    <Translate contentKey="scanningApp.basicLinkuser.userid">Userid</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('phone')}>
                    <Translate contentKey="scanningApp.basicLinkuser.phone">Phone</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('name')}>
                    <Translate contentKey="scanningApp.basicLinkuser.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('idcard')}>
                    <Translate contentKey="scanningApp.basicLinkuser.idcard">Idcard</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('sex')}>
                    <Translate contentKey="scanningApp.basicLinkuser.sex">Sex</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('address')}>
                    <Translate contentKey="scanningApp.basicLinkuser.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('province')}>
                    <Translate contentKey="scanningApp.basicLinkuser.province">Province</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('city')}>
                    <Translate contentKey="scanningApp.basicLinkuser.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('county')}>
                    <Translate contentKey="scanningApp.basicLinkuser.county">County</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('loginnum')}>
                    <Translate contentKey="scanningApp.basicLinkuser.loginnum">Loginnum</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('creator')}>
                    <Translate contentKey="scanningApp.basicLinkuser.creator">Creator</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('createdate')}>
                    <Translate contentKey="scanningApp.basicLinkuser.createdate">Createdate</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('modifier')}>
                    <Translate contentKey="scanningApp.basicLinkuser.modifier">Modifier</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('modifierdate')}>
                    <Translate contentKey="scanningApp.basicLinkuser.modifierdate">Modifierdate</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('modifiernum')}>
                    <Translate contentKey="scanningApp.basicLinkuser.modifiernum">Modifiernum</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('logicdelete')}>
                    <Translate contentKey="scanningApp.basicLinkuser.logicdelete">Logicdelete</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('other')}>
                    <Translate contentKey="scanningApp.basicLinkuser.other">Other</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {linkuserList.map((linkuser, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${linkuser.id}`} color="link" size="sm">
                        {linkuser.id}
                      </Button>
                    </td>
                    <td>{linkuser.userid}</td>
                    <td>{linkuser.phone}</td>
                    <td>{linkuser.name}</td>
                    <td>{linkuser.idcard}</td>
                    <td>{linkuser.sex}</td>
                    <td>{linkuser.address}</td>
                    <td>{linkuser.province}</td>
                    <td>{linkuser.city}</td>
                    <td>{linkuser.county}</td>
                    <td>{linkuser.loginnum}</td>
                    <td>{linkuser.creator}</td>
                    <td>{linkuser.createdate}</td>
                    <td>{linkuser.modifier}</td>
                    <td>{linkuser.modifierdate}</td>
                    <td>{linkuser.modifiernum}</td>
                    <td>{linkuser.logicdelete ? 'true' : 'false'}</td>
                    <td>{linkuser.other}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${linkuser.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${linkuser.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${linkuser.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ linkuser }: IRootState) => ({
  linkuserList: linkuser.entities,
  totalItems: linkuser.totalItems,
  links: linkuser.links,
  entity: linkuser.entity,
  updateSuccess: linkuser.updateSuccess
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
)(Linkuser);
