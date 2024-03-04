import React from 'react';
import { Loader } from 'semantic-ui-react';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <Loader active inline='centered' />
    </div>
  );
};

export default Loading;