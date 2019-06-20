import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './linkuser.reducer';

export interface ILinkuserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LinkuserDetail extends React.Component<ILinkuserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { linkuserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scanningApp.basicLinkuser.detail.title">Linkuser</Translate> [<b>{linkuserEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userid">
                <Translate contentKey="scanningApp.basicLinkuser.userid">Userid</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.userid}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="scanningApp.basicLinkuser.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.phone}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="scanningApp.basicLinkuser.name">Name</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.name}</dd>
            <dt>
              <span id="idcard">
                <Translate contentKey="scanningApp.basicLinkuser.idcard">Idcard</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.idcard}</dd>
            <dt>
              <span id="sex">
                <Translate contentKey="scanningApp.basicLinkuser.sex">Sex</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.sex}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="scanningApp.basicLinkuser.address">Address</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.address}</dd>
            <dt>
              <span id="province">
                <Translate contentKey="scanningApp.basicLinkuser.province">Province</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.province}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="scanningApp.basicLinkuser.city">City</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.city}</dd>
            <dt>
              <span id="county">
                <Translate contentKey="scanningApp.basicLinkuser.county">County</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.county}</dd>
            <dt>
              <span id="loginnum">
                <Translate contentKey="scanningApp.basicLinkuser.loginnum">Loginnum</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.loginnum}</dd>
            <dt>
              <span id="creator">
                <Translate contentKey="scanningApp.basicLinkuser.creator">Creator</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.creator}</dd>
            <dt>
              <span id="createdate">
                <Translate contentKey="scanningApp.basicLinkuser.createdate">Createdate</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.createdate}</dd>
            <dt>
              <span id="modifier">
                <Translate contentKey="scanningApp.basicLinkuser.modifier">Modifier</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.modifier}</dd>
            <dt>
              <span id="modifierdate">
                <Translate contentKey="scanningApp.basicLinkuser.modifierdate">Modifierdate</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.modifierdate}</dd>
            <dt>
              <span id="modifiernum">
                <Translate contentKey="scanningApp.basicLinkuser.modifiernum">Modifiernum</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.modifiernum}</dd>
            <dt>
              <span id="logicdelete">
                <Translate contentKey="scanningApp.basicLinkuser.logicdelete">Logicdelete</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.logicdelete ? 'true' : 'false'}</dd>
            <dt>
              <span id="other">
                <Translate contentKey="scanningApp.basicLinkuser.other">Other</Translate>
              </span>
            </dt>
            <dd>{linkuserEntity.other}</dd>
          </dl>
          <Button tag={Link} to="/entity/linkuser" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/linkuser/${linkuserEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ linkuser }: IRootState) => ({
  linkuserEntity: linkuser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkuserDetail);
