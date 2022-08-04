import express from 'express';

import { buildStatus } from './buildStatus.js';
import { fetchConfigurations } from './fetchConfigurations.js';
import { uploadConfiguration } from './uploadConfiguration/index.js';

const app = express();
const port = process.env.PORT || 5000;
let status = buildStatus('Waiting for updates...');

app.use(express.json());

app.get('/', (_, response) => {
  response.send(status);
});

app.post('/ping', async (_, response) => {
  const { data, errors } = await fetchConfigurations();

  try {
    if (data) {
      status = buildStatus('✅ CMS Data is fetched!', status);

      const cmsPayload = JSON.stringify(data);
      const { success, errors } = await uploadConfiguration(cmsPayload);

      if (success) {
        status = buildStatus('✅ KV update is successful!', status);

        response.sendStatus(200);
      } else {
        status = buildStatus('❌ KV update was unsuccessful!', status);

        console.error(errors);
        response.sendStatus(500);
      }
    } else {
      status = buildStatus('❌ CMS Data fetch failed.', status);

      console.log(errors);
      response.sendStatus(500);
    }
  } catch (error) {
    console.log(`Caught: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
