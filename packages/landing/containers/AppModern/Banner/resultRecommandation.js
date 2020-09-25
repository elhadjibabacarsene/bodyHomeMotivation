import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BoostrapStyle from '../boostrap.style';
import { Alert, Button } from 'react-bootstrap';
import { closeModal, openModal } from '@redq/reuse-modal';
import CloseModalButton from './index';
import { SubscribeModal } from '../SubscribeModal/index';
import bhmFunctions from '../../../../functions/bhm';

export const resultModal = ({
  row,
  col,
  btnStyle,
  logoStyle,
  titleStyle,
  contentWrapper,
  outlineBtnStyle,
  descriptionStyle,
  googleButtonStyle,
}) => {
  //On récupère le résultat de la recommandation
  const resultRecommandation = JSON.parse(window.localStorage.getItem('resultRecommandation'));
  console.log(resultRecommandation);

  //On définir les constances pour l'affichage
  const imc = resultRecommandation.e_imc;
  const statutRecommandation = resultRecommandation.e_recommandation;
  const programmeRecommander = bhmFunctions.Ucfirst(resultRecommandation.e_programme);
  const programmeChoisi = bhmFunctions.Ucfirst(bhmFunctions.replaceUnderscoreToSpace(window.localStorage.getItem("programmeChoisi")));

  //console.log(programmeChoisi);

  //Le message à afficher
  let message,
    colorText = '';
  switch (statutRecommandation) {
    case 'recommande':
      message = 'Votre profil santé correspond bien à l’objectif ';
      colorText = 'success';
      break;
    case 'neutre':
      message = message = 'Votre profil santé correspond au programme ';
      colorText = 'warning';
      break;
    case 'non recommande':
      message = 'Le programme ' + programmeRecommander + ' est plus adapté à votre profil santé que le programme ';
      colorText = 'danger';
      break;
  }

  const ButtonSubscribe = () => (
    <Fragment>
      <Button className="default" title="Poursuivre" {...btnStyle} />
    </Fragment>
  );
  const ButtonCancel = () => (
    <Fragment>
      <Button className="default" title="Annuler" {...btnStyle} />
    </Fragment>
  );

  const openSubscribeModal = () => {
    closeModal();
    handleModalSubscribe();
  };

  const handleModalSubscribe = () => {
    openModal({
      config: {
        className: 'video-modal',
        disableDragging: true,
        default: {
          width: '1000px',
          height: '500px',
          x: 0,
          y: 0,
        },
      },
      component: SubscribeModal,
      componentProps: {},
      closeComponent: CloseModalButton,
      closeOnClickOutside: true,
    });
  };

  return (
    <>
      <BoostrapStyle>
        <div className="container-fluid">
          <div className="row bg-color-bhm-orange">
            <div className="col text-center pt-3">
              <h1 className="text-white">Résultat de la recommandation</h1>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col text-center">
              <h5>Votre Indice de Masse Corporelle est de: <span className="text-bhm-orange">{imc}</span></h5>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col mt-4 text-center">
              <Alert variant={colorText}>
                {message}
                {programmeChoisi} !
              </Alert>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col text-center">
              <h5 className="text-dark">Que voulez vous faire maintenant ?</h5>
              <p className="text-secondary mt-3">Choisissez une option: </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-6 text-center">
              <Button className="btn-bhm-orange w-100">Annuler</Button>
            </div>
            <div className="col-6 text-center">
              <Button
                className="btn-bhm-orange w-100"
                onClick={openSubscribeModal}
              >
                Poursuivre
              </Button>
            </div>
          </div>
        </div>
      </BoostrapStyle>
    </>
  );
};

// LoginModal style props
resultModal.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  logoStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
};

resultModal.defaultProps = {
  // Title default style
  titleStyle: {
    fontSize: ['12px', '30px', '30px'],
    fontWeight: '400',
    color: '#fd9603',
    letterSpacing: '-0.025em',
    mt: '30px',
    mb: '10px',
    textAlign: 'center',
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
  },
  col: {
    width: [1, 1 / 2],
  },
  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '20px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mb: '15px',
    ml: '1px',
  },
};
