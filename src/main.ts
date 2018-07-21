import { startApiServer } from './app/main';
import { startWebServer } from './web-api/main';

(async () => {
  await startApiServer();
  await startWebServer();
})();
