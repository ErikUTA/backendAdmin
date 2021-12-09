import {Entity, model, property, hasOne} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_project_id: {
        name: 'fk_project_id',
        entity: 'Project',
        entityKey: 'id',
        foreignKey: 'project_id',
      },
      fk_userTask: {
        name: 'fk_userTask',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'user_id',
      },
    },
  },
}) 
export class Task extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  task_name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  user_id?: number;

  @property({
    type: 'number',
  })
  project_id?: number;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
