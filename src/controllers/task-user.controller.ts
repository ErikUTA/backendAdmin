// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   param,
//   patch,
//   post,
//   requestBody,
// } from '@loopback/rest';
// import {
//   Task,
//   User,
// } from '../models';
// import {TaskRepository} from '../repositories';

// export class TaskUserController {
//   constructor(
//     @repository(TaskRepository) protected taskRepository: TaskRepository,
//   ) { }

//   @get('/tasks/{id}/user', {
//     responses: {
//       '200': {
//         description: 'Task has one User',
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(User),
//           },
//         },
//       },
//     },
//   })
//   async get(
//     @param.path.number('id') id: number,
//     @param.query.object('filter') filter?: Filter<User>,
//   ): Promise<User> {
//     return this.taskRepository.user(id).get(filter);
//   }

//   @post('/tasks/{id}/user', {
//     responses: {
//       '200': {
//         description: 'Task model instance',
//         content: {'application/json': {schema: getModelSchemaRef(User)}},
//       },
//     },
//   })
//   async create(
//     @param.path.number('id') id: typeof Task.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {
//             title: 'NewUserInTask',
//             exclude: ['id'],
//             optional: ['user_id']
//           }),
//         },
//       },
//     }) user: Omit<User, 'id'>,
//   ): Promise<User> {
//     return this.taskRepository.user(id).create(user);
//   }

//   @patch('/tasks/{id}/user', {
//     responses: {
//       '200': {
//         description: 'Task.User PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.number('id') id: number,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {partial: true}),
//         },
//       },
//     })
//     user: Partial<User>,
//     @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
//   ): Promise<Count> {
//     return this.taskRepository.user(id).patch(user, where);
//   }

//   @del('/tasks/{id}/user', {
//     responses: {
//       '200': {
//         description: 'Task.User DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.number('id') id: number,
//     @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
//   ): Promise<Count> {
//     return this.taskRepository.user(id).delete(where);
//   }
// }
