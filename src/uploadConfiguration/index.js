import fetch from 'node-fetch';

import { buildCfRequest } from './buildCfRequest.js';

const uploadConfiguration = async (body) => {
  try {
    const { url, headers } = buildCfRequest();
    const response = await fetch(url, { headers, method: 'PUT', body });

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export { uploadConfiguration };
