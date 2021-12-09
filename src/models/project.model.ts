import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Task} from './task.model';

@model({
  settings: {
    foreignKeys: {
      fk_user_id: {
        name: 'fk_user_id',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'user_id',
      },
    },
  },
}) 

export class Project extends Entity {
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
  project_name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  leader_project?: string;

  @property({
    type: 'number',
  })
  projects?: number;

  @hasMany(() => User, {keyTo: 'users_id'})
  users: User[];

  @hasMany(() => Task, {keyTo: 'project_id'})
  tasks: Task[];

  @belongsTo(() => User, {name: 'user'})
  user_id: number;

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
