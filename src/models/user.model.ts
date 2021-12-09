import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Task} from './task.model';
import {Project} from './project.model';
import {Role} from './role.model';

@model({
  settings: {
  foreignKeys: {
    fk_role_id: {
      name: 'fk_role_id',
      entity: 'Role',
      entityKey: 'id',
      foreignKey: 'role_id',
    },
  },
},
}) 

export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fullname: string;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  cell_phone?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  job_title: string;
  @property({
    type: 'date',
  })
  entry_date?: string;

  @property({
    type: 'number',
  })
  users_id?: number;

  @belongsTo(() => Role, {name: 'role'})
  role_id: string;

  @hasMany(() => Project, {keyTo: 'user_id'})
  projects: Project[];

  @hasMany(() => Task, {keyTo: 'user_id'})
  tasks: Task[];

  @belongsTo(() => Task, {name: 'userTask'})
  user_id: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
