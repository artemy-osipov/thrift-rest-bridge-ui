import { delay, http, HttpResponse } from 'msw';
import { response, services, template } from './data';

export const handlers = [
  http.get('/mocks/services', async () => {
    await delay(1000);
    return HttpResponse.json(services, { status: 200 });
  }),
  http.get(
    '/mocks/services/:serviceId/operations/:operationName/template',
    async ({ params }) => {
      await delay(1000);
      const { serviceId, operationName } = params;
      return HttpResponse.json(
        template(serviceId as string, operationName as string),
        { status: 200 }
      );
    }
  ),

  http.post(
    '/mocks/services/:serviceId/operations/:operationName',
    async ({ params }) => {
      await delay(1000);
      const { serviceId, operationName } = params;
      return HttpResponse.json(
        response(serviceId as string, operationName as string),
        { status: 200 }
      );
    }
  ),
];
