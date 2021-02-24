import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

import Subscribe from './Subscribe';
import Success from './Success';
import Unsubscribe from './Unsubscribe';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://hguandl.com/">
        hguandl
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  const [page, setPage] = useState('subscribe')

  const renderStep = () => {
    switch (page) {
      case 'finishSubscribe':
      case 'finishUnsubscribe':
        return <Success page={page} />
      case 'unsubscribe':
        return <Unsubscribe handleNext={setPage} />
      case 'subscribe':
      default:
        return <Subscribe handleNext={setPage} />
    }
  }


  return (
    <div>
      {renderStep()}
    </div>
  );
};

export { Copyright };
export default App;
