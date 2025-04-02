export enum TaskType {
  feature = 'feature',
  bug = 'bug',
  chore = 'chore',
}

export type Task<T = TaskType> = {
  name: string;
  type: T;
}

const whatever: Task = {
  name: 'whatever',
  type: TaskType.feature,
}

whatever.type = TaskType.bug; // ✅

type FeatureTask = Task<TaskType.feature>;

const feature: FeatureTask = {
  name: 'feature',
  type: TaskType.feature, // type is defined as TaskType.feature !!
}

// feature.type = TaskType.bug; // ❌
feature.type = TaskType.feature; // ✅
