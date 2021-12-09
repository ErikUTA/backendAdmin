import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Task,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTaskController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/task', {
    responses: {
      '200': {
        description: 'Task belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async getTask(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<Task> {
    return this.userRepository.userTask(id);
  }
}
