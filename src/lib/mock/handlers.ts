import { rest } from 'msw'
import { response, services, template } from './data'

export const handlers = [
  rest.get('/mocks/services', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(services))
  }),
  rest.get(
    '/mocks/services/:serviceId/operations/:operationName/template',
    (req, res, ctx) => {
      const { serviceId, operationName } = req.params
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(template(serviceId as string, operationName as string))
      )
    }
  ),
  rest.post(
    '/mocks/services/:serviceId/operations/:operationName',
    (req, res, ctx) => {
      const { serviceId, operationName } = req.params
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(response(serviceId as string, operationName as string))
      )
    }
  ),
]
