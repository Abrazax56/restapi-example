import { web } from './Web/Express';
import 'dotenv/config';
const port = process.env.PORT || 8080;
web.listen(port, '0.0.0.0', () => {
    console.info('running on port ' + port);
});
