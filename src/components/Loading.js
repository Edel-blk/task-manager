import React from 'react';
import { WHITE } from '../utils/constants';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <h3 style={{ color: WHITE }}>Loading...</h3>

      <Loader active inline='centered' />
    </div>
  );
};

export default Loading;