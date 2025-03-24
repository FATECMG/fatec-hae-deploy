import { Course, CreatedCourse } from '@/domain/course/entities/Course'
import { Fields } from '@/domain/course/entities/Enums'

import { IHttpClient } from '@/infra/http/IHttpClient'
import { properlyResponse } from '@/infra/http/HttpSwitchCase'

import { BASE_API } from '@/config/api/Api'

import { RequestError } from '@/main/error/RequestError'
import { DefaultErrorMessages } from '@/main/error/ErrorMessages'

import { IcourseUseCases } from './Interface'

const RESOURCE = `${BASE_API}/courses`

export class CourseUseCases implements IcourseUseCases {
  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(active: boolean): Promise<Course[]> {
    const url = `${RESOURCE}?active=${active}`
    const { statusCode, body } = await this.httpClient.request<Course[]>({
      method: 'get',
      resource: url,
    })

    return properlyResponse({
      statusCode,
      data: body,
      notFoundMessage: DefaultErrorMessages.COURSE.notFoundAll,
      badRequestError: new RequestError(
        DefaultErrorMessages.COURSE.notFoundAll,
        'warning',
      ),
    })
  }

  async findById(id: string): Promise<Course> {
    const { statusCode, body } = await this.httpClient.request<Course>({
      method: 'get',
      resource: `${RESOURCE}/${id}`,
    })

    return properlyResponse({
      statusCode,
      data: body,
      badRequestError: new RequestError(
        DefaultErrorMessages.COURSE.notFoundOne,
        'warning',
      ),
    })
  }

  async create(course: CreatedCourse): Promise<Course> {
    const { statusCode, body } = await this.httpClient.request<Course>({
      method: 'post',
      resource: RESOURCE,
      body: course,
    })

    return properlyResponse({
      statusCode,
      data: body,
      badRequestError: new RequestError<Fields>(
        DefaultErrorMessages.GENERIC.validationError,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  async updateById(course: Course): Promise<Course> {
    const { statusCode, body } = await this.httpClient.request<Course>({
      method: 'put',
      resource: `${RESOURCE}/${course.id}`,
      body: course,
    })

    return properlyResponse({
      statusCode,
      data: body,
      badRequestError: new RequestError<Fields>(
        DefaultErrorMessages.COURSE.update,
        'warning',
        body instanceof Array ? [...body] : [body],
      ),
    })
  }

  async deleteById(id: string): Promise<void> {
    const { statusCode } = await this.httpClient.request<void>({
      method: 'delete',
      resource: `${RESOURCE}/${id}`,
    })

    return properlyResponse({
      data: undefined,
      statusCode,
      badRequestError: new RequestError(
        DefaultErrorMessages.COURSE.delete,
        'warning',
      ),
    })
  }
}
