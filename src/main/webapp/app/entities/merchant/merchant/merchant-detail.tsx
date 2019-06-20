import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './merchant.reducer';
import { IMerchant } from 'app/shared/model/merchant/merchant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMerchantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MerchantDetail extends React.Component<IMerchantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { merchantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scanningApp.merchantMerchant.detail.title">Merchant</Translate> [<b>{merchantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userid">
                <Translate contentKey="scanningApp.merchantMerchant.userid">Userid</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.userid}</dd>
            <dt>
              <span id="merchantphoto">
                <Translate contentKey="scanningApp.merchantMerchant.merchantphoto">Merchantphoto</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.merchantphoto}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="scanningApp.merchantMerchant.name">Name</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.name}</dd>
            <dt>
              <span id="businessid">
                <Translate contentKey="scanningApp.merchantMerchant.businessid">Businessid</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.businessid}</dd>
            <dt>
              <span id="state">
                <Translate contentKey="scanningApp.merchantMerchant.state">State</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.state}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="scanningApp.merchantMerchant.address">Address</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.address}</dd>
            <dt>
              <span id="province">
                <Translate contentKey="scanningApp.merchantMerchant.province">Province</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.province}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="scanningApp.merchantMerchant.city">City</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.city}</dd>
            <dt>
              <span id="county">
                <Translate contentKey="scanningApp.merchantMerchant.county">County</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.county}</dd>
            <dt>
              <span id="concession">
                <Translate contentKey="scanningApp.merchantMerchant.concession">Concession</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.concession}</dd>
            <dt>
              <span id="rebate">
                <Translate contentKey="scanningApp.merchantMerchant.rebate">Rebate</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.rebate}</dd>
            <dt>
              <span id="weight">
                <Translate contentKey="scanningApp.merchantMerchant.weight">Weight</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.weight}</dd>
            <dt>
              <span id="creator">
                <Translate contentKey="scanningApp.merchantMerchant.creator">Creator</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.creator}</dd>
            <dt>
              <span id="createdate">
                <Translate contentKey="scanningApp.merchantMerchant.createdate">Createdate</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.createdate}</dd>
            <dt>
              <span id="modifier">
                <Translate contentKey="scanningApp.merchantMerchant.modifier">Modifier</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.modifier}</dd>
            <dt>
              <span id="modifierdate">
                <Translate contentKey="scanningApp.merchantMerchant.modifierdate">Modifierdate</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.modifierdate}</dd>
            <dt>
              <span id="modifiernum">
                <Translate contentKey="scanningApp.merchantMerchant.modifiernum">Modifiernum</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.modifiernum}</dd>
            <dt>
              <span id="logicdelete">
                <Translate contentKey="scanningApp.merchantMerchant.logicdelete">Logicdelete</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.logicdelete ? 'true' : 'false'}</dd>
            <dt>
              <span id="other">
                <Translate contentKey="scanningApp.merchantMerchant.other">Other</Translate>
              </span>
            </dt>
            <dd>{merchantEntity.other}</dd>
          </dl>
          <Button tag={Link} to="/entity/merchant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/merchant/${merchantEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ merchant }: IRootState) => ({
  merchantEntity: merchant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetail);
