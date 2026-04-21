import { createAxiosClient } from '@base44/sdk/dist/utils/axios-client';

const base44 = createAxiosClient({
  baseURL: '/api',
  headers: {},
  token: null,
  interceptResponses: true
});

export { base44 };