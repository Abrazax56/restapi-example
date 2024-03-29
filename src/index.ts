import { web } from './Web/Express';
import 'dotenv/config';

const port: number | string | any = process.env.PORT || 8080;

web.listen(port, '0.0.0.0', (): void => {
  console.info('running on port ' + port);
})