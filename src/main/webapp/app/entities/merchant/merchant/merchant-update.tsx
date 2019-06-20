import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './merchant.reducer';
import { IMerchant } from 'app/shared/model/merchant/merchant.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMerchantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMerchantUpdateState {
  isNew: boolean;
}

export class MerchantUpdate extends React.Component<IMerchantUpdateProps, IMerchantUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { merchantEntity } = this.props;
      const entity = {
        ...merchantEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/merchant');
  };

  render() {
    const { merchantEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="scanningApp.merchantMerchant.home.createOrEditLabel">
              <Translate contentKey="scanningApp.merchantMerchant.home.createOrEditLabel">Create or edit a Merchant</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : merchantEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="merchant-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="merchant-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="useridLabel" for="merchant-userid">
                    <Translate contentKey="scanningApp.merchantMerchant.userid">Userid</Translate>
                  </Label>
                  <AvField id="merchant-userid" type="text" name="userid" />
                </AvGroup>
                <AvGroup>
                  <Label id="merchantphotoLabel" for="merchant-merchantphoto">
                    <Translate contentKey="scanningApp.merchantMerchant.merchantphoto">Merchantphoto</Translate>
                  </Label>
                  <AvField id="merchant-merchantphoto" type="text" name="merchantphoto" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="merchant-name">
                    <Translate contentKey="scanningApp.merchantMerchant.name">Name</Translate>
                  </Label>
                  <AvField id="merchant-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="businessidLabel" for="merchant-businessid">
                    <Translate contentKey="scanningApp.merchantMerchant.businessid">Businessid</Translate>
                  </Label>
                  <AvField id="merchant-businessid" type="text" name="businessid" />
                </AvGroup>
                <AvGroup>
                  <Label id="stateLabel" for="merchant-state">
                    <Translate contentKey="scanningApp.merchantMerchant.state">State</Translate>
                  </Label>
                  <AvField id="merchant-state" type="text" name="state" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="merchant-address">
                    <Translate contentKey="scanningApp.merchantMerchant.address">Address</Translate>
                  </Label>
                  <AvField id="merchant-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="provinceLabel" for="merchant-province">
                    <Translate contentKey="scanningApp.merchantMerchant.province">Province</Translate>
                  </Label>
                  <AvField id="merchant-province" type="text" name="province" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="merchant-city">
                    <Translate contentKey="scanningApp.merchantMerchant.city">City</Translate>
                  </Label>
                  <AvField id="merchant-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="countyLabel" for="merchant-county">
                    <Translate contentKey="scanningApp.merchantMerchant.county">County</Translate>
                  </Label>
                  <AvField id="merchant-county" type="text" name="county" />
                </AvGroup>
                <AvGroup>
                  <Label id="concessionLabel" for="merchant-concession">
                    <Translate contentKey="scanningApp.merchantMerchant.concession">Concession</Translate>
                  </Label>
                  <AvField id="merchant-concession" type="string" className="form-control" name="concession" />
                </AvGroup>
                <AvGroup>
                  <Label id="rebateLabel" for="merchant-rebate">
                    <Translate contentKey="scanningApp.merchantMerchant.rebate">Rebate</Translate>
                  </Label>
                  <AvField id="merchant-rebate" type="string" className="form-control" name="rebate" />
                </AvGroup>
                <AvGroup>
                  <Label id="weightLabel" for="merchant-weight">
                    <Translate contentKey="scanningApp.merchantMerchant.weight">Weight</Translate>
                  </Label>
                  <AvField id="merchant-weight" type="text" name="weight" />
                </AvGroup>
                <AvGroup>
                  <Label id="creatorLabel" for="merchant-creator">
                    <Translate contentKey="scanningApp.merchantMerchant.creator">Creator</Translate>
                  </Label>
                  <AvField id="merchant-creator" type="text" name="creator" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdateLabel" for="merchant-createdate">
                    <Translate contentKey="scanningApp.merchantMerchant.createdate">Createdate</Translate>
                  </Label>
                  <AvField id="merchant-createdate" type="text" name="createdate" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifierLabel" for="merchant-modifier">
                    <Translate contentKey="scanningApp.merchantMerchant.modifier">Modifier</Translate>
                  </Label>
                  <AvField id="merchant-modifier" type="text" name="modifier" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifierdateLabel" for="merchant-modifierdate">
                    <Translate contentKey="scanningApp.merchantMerchant.modifierdate">Modifierdate</Translate>
                  </Label>
                  <AvField id="merchant-modifierdate" type="text" name="modifierdate" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifiernumLabel" for="merchant-modifiernum">
                    <Translate contentKey="scanningApp.merchantMerchant.modifiernum">Modifiernum</Translate>
                  </Label>
                  <AvField id="merchant-modifiernum" type="string" className="form-control" name="modifiernum" />
                </AvGroup>
                <AvGroup>
                  <Label id="logicdeleteLabel" check>
                    <AvInput id="merchant-logicdelete" type="checkbox" className="form-control" name="logicdelete" />
                    <Translate contentKey="scanningApp.merchantMerchant.logicdelete">Logicdelete</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="otherLabel" for="merchant-other">
                    <Translate contentKey="scanningApp.merchantMerchant.other">Other</Translate>
                  </Label>
                  <AvField id="merchant-other" type="text" name="other" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/merchant" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  merchantEntity: storeState.merchant.entity,
  loading: storeState.merchant.loading,
  updating: storeState.merchant.updating,
  updateSuccess: storeState.merchant.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantUpdate);
