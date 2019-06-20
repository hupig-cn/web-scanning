import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './linkuser.reducer';
import { ILinkuser } from 'app/shared/model/basic/linkuser.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILinkuserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILinkuserUpdateState {
  isNew: boolean;
}

export class LinkuserUpdate extends React.Component<ILinkuserUpdateProps, ILinkuserUpdateState> {
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
      const { linkuserEntity } = this.props;
      const entity = {
        ...linkuserEntity,
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
    this.props.history.push('/entity/linkuser');
  };

  render() {
    const { linkuserEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="scanningApp.basicLinkuser.home.createOrEditLabel">
              <Translate contentKey="scanningApp.basicLinkuser.home.createOrEditLabel">Create or edit a Linkuser</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : linkuserEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="linkuser-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="linkuser-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="useridLabel" for="linkuser-userid">
                    <Translate contentKey="scanningApp.basicLinkuser.userid">Userid</Translate>
                  </Label>
                  <AvField id="linkuser-userid" type="text" name="userid" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="linkuser-phone">
                    <Translate contentKey="scanningApp.basicLinkuser.phone">Phone</Translate>
                  </Label>
                  <AvField id="linkuser-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="linkuser-name">
                    <Translate contentKey="scanningApp.basicLinkuser.name">Name</Translate>
                  </Label>
                  <AvField id="linkuser-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="idcardLabel" for="linkuser-idcard">
                    <Translate contentKey="scanningApp.basicLinkuser.idcard">Idcard</Translate>
                  </Label>
                  <AvField id="linkuser-idcard" type="text" name="idcard" />
                </AvGroup>
                <AvGroup>
                  <Label id="sexLabel" for="linkuser-sex">
                    <Translate contentKey="scanningApp.basicLinkuser.sex">Sex</Translate>
                  </Label>
                  <AvField id="linkuser-sex" type="text" name="sex" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="linkuser-address">
                    <Translate contentKey="scanningApp.basicLinkuser.address">Address</Translate>
                  </Label>
                  <AvField id="linkuser-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="provinceLabel" for="linkuser-province">
                    <Translate contentKey="scanningApp.basicLinkuser.province">Province</Translate>
                  </Label>
                  <AvField id="linkuser-province" type="text" name="province" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="linkuser-city">
                    <Translate contentKey="scanningApp.basicLinkuser.city">City</Translate>
                  </Label>
                  <AvField id="linkuser-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="countyLabel" for="linkuser-county">
                    <Translate contentKey="scanningApp.basicLinkuser.county">County</Translate>
                  </Label>
                  <AvField id="linkuser-county" type="text" name="county" />
                </AvGroup>
                <AvGroup>
                  <Label id="loginnumLabel" for="linkuser-loginnum">
                    <Translate contentKey="scanningApp.basicLinkuser.loginnum">Loginnum</Translate>
                  </Label>
                  <AvField id="linkuser-loginnum" type="string" className="form-control" name="loginnum" />
                </AvGroup>
                <AvGroup>
                  <Label id="creatorLabel" for="linkuser-creator">
                    <Translate contentKey="scanningApp.basicLinkuser.creator">Creator</Translate>
                  </Label>
                  <AvField id="linkuser-creator" type="text" name="creator" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdateLabel" for="linkuser-createdate">
                    <Translate contentKey="scanningApp.basicLinkuser.createdate">Createdate</Translate>
                  </Label>
                  <AvField id="linkuser-createdate" type="text" name="createdate" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifierLabel" for="linkuser-modifier">
                    <Translate contentKey="scanningApp.basicLinkuser.modifier">Modifier</Translate>
                  </Label>
                  <AvField id="linkuser-modifier" type="text" name="modifier" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifierdateLabel" for="linkuser-modifierdate">
                    <Translate contentKey="scanningApp.basicLinkuser.modifierdate">Modifierdate</Translate>
                  </Label>
                  <AvField id="linkuser-modifierdate" type="text" name="modifierdate" />
                </AvGroup>
                <AvGroup>
                  <Label id="modifiernumLabel" for="linkuser-modifiernum">
                    <Translate contentKey="scanningApp.basicLinkuser.modifiernum">Modifiernum</Translate>
                  </Label>
                  <AvField id="linkuser-modifiernum" type="string" className="form-control" name="modifiernum" />
                </AvGroup>
                <AvGroup>
                  <Label id="logicdeleteLabel" check>
                    <AvInput id="linkuser-logicdelete" type="checkbox" className="form-control" name="logicdelete" />
                    <Translate contentKey="scanningApp.basicLinkuser.logicdelete">Logicdelete</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="otherLabel" for="linkuser-other">
                    <Translate contentKey="scanningApp.basicLinkuser.other">Other</Translate>
                  </Label>
                  <AvField id="linkuser-other" type="text" name="other" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/linkuser" replace color="info">
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
  linkuserEntity: storeState.linkuser.entity,
  loading: storeState.linkuser.loading,
  updating: storeState.linkuser.updating,
  updateSuccess: storeState.linkuser.updateSuccess
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
)(LinkuserUpdate);
