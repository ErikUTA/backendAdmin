import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import { GeneralFunctionsService } from '../services';
import { service } from '@loopback/core';
import {Keys as keys} from '../config/keys'; 
import { SessionService } from '../services/session.service';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @service(GeneralFunctionsService)
    public serviceFunctions: GeneralFunctionsService,
    @service(SessionService)
    public serviceService: SessionService
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    let passwordEncrypted = this.serviceFunctions.EncryptPassword(user.password);
    // console.log(coordinator.password);
    // console.log(passwordEncrypted);
    user.password = passwordEncrypted;
    // let createdCoordinator = this.coordinatorRepository.create(coordinator);
    // return createdCoordinator;
    return this.userRepository.create(user);
  }
  
  @post('/login')
  async validateC(
    @requestBody(
      {
        content:{
          'application/json': {
            schema: getModelSchemaRef(User, {
              exclude: ['id', 'fullname', 'cell_phone', 'job_title', 'role_id', 'role_id', 'entry_date', 'status']
            })
          }
        }
      }
    )
    user: User
  ):Promise<object> {
    let coordinatorExist = await this.userRepository.findOne({where: {email: user.email, password: user.password}});
    if(coordinatorExist) {
      //Generate Token
      let token = this.serviceService.GenerateToken(coordinatorExist)
            // return coordinatorExist;
      return {
        coordinator: {
          email: coordinatorExist.email,
          role: coordinatorExist.role_id
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]("Credentials are incorrect")
    }
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
