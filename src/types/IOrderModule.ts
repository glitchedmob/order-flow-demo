import type { RouteRecordRaw } from 'vue-router';
import type { StoreDefinition } from 'pinia';

interface IOrderModuleStoreState {}

interface IOrderModuleStoreGetters {
  isValid: boolean;
}

interface IOrderModuleStoreActions {
  initialize: () => Promise<void> | void;
}

type IOrderModuleStoreDefinition = StoreDefinition<
  string,
  IOrderModuleStoreState,
  IOrderModuleStoreGetters,
  IOrderModuleStoreActions
>;

export interface IOrderModule<
  TStore extends IOrderModuleStoreDefinition = IOrderModuleStoreDefinition,
> {
  routes: RouteRecordRaw[];

  useModuleStore: TStore;
}
