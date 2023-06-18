import app from './app';
import { port } from '../config';

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`[API]: Listening on http://localhost:${port}`);
  /* eslint-enable no-console */
});
