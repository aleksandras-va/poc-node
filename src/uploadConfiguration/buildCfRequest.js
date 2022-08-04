const KEY = 'EXPERIMENTS_CONFIGURATION';
const {
  CF_ACC_ID: account,
  CF_NAMESPACE_ID: namespace,
  CF_AUTH_EMAIL: authEmail,
  CF_AUTH_KEY: authKey,
} = process.env;

const buildCfRequest = () => {
  if (!account || !namespace || !authEmail || !authKey) {
    throw new Error('One or more environment keys are not found.');
  }

  const url = new URL(
    `https://api.cloudflare.com/client/v4/accounts/${account}/storage/kv/namespaces/${namespace}/values/${KEY}`
  );

  const headers = new Headers({
    'Content-Type': 'text/plain',
    'X-Auth-Email': authEmail,
    'X-Auth-Key': authKey,
  });

  return { url, headers };
};

export { buildCfRequest };
