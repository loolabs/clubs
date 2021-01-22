import * as express from 'express'
import { ValidationError } from 'joi'
import { Result } from '../core/result'

export abstract class BaseController<DTO> {
  public async execute(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const dtoResult = await this.validate(req)
      if (dtoResult.isErr()) {
        return this.clientError(res, dtoResult.error.toString())
      } else {
        return await this.executeImpl(dtoResult.value, res)
      }
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`)
      console.log(err)
      return this.fail(res, 'An unexpected error occurred')
    }
  }

  public ok<T>(res: express.Response, dto?: T): express.Response {
    if (dto) {
      res.type('application/json')
      return res.status(200).json(dto)
    } else {
      return res.sendStatus(200)
    }
  }

  public fail(res: express.Response, error: Error | string): express.Response {
    console.log(error)
    return res.status(500).json({
      message: error.toString(),
    })
  }

  protected abstract validate(req: express.Request): Result<DTO, ValidationError>

  protected abstract executeImpl(dto: DTO, res: express.Response): Promise<void | any>

  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public created(res: express.Response) {
    return res.sendStatus(201)
  }

  public clientError(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized')
  }

  public unauthorized(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized')
  }

  public paymentRequired(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required')
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden')
  }

  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found')
  }

  public conflict(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict')
  }

  public tooMany(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests')
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, 400, 'TODO')
  }
}
