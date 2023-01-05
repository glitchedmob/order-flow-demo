import type { RouteRecordRaw } from 'vue-router';
import type { StoreDefinition } from 'pinia';
import type { defineAsyncComponent } from 'vue';

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

export interface IOrderModule<TStore extends IOrderModuleStoreDefinition> {
  startRoute: string;

  routes: RouteRecordRaw[];

  summaryItemComponent: ReturnType<typeof defineAsyncComponent>;

  useModuleStore: TStore;
}
