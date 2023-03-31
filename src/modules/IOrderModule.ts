import type { RouteRecordRaw } from 'vue-router';
import type { Store } from 'pinia';
import type { defineAsyncComponent } from 'vue';

interface IOrderModuleStoreState {}

interface IOrderModuleStoreGetters {
  isValid: boolean;
}

interface IOrderModuleStoreActions {
  initialize: () => Promise<void> | void;
}

export type IOrderModuleStore = Store<
  string,
  IOrderModuleStoreState,
  IOrderModuleStoreGetters,
  IOrderModuleStoreActions
>;

export interface IOrderModule {
  startRoute: string;

  routes: RouteRecordRaw[];

  summaryItemComponent: ReturnType<typeof defineAsyncComponent>;

  useModuleStore: () => IOrderModuleStore;
}

export interface IOrderReviewModule {
  startRoute: string;
  routes: RouteRecordRaw[];
}
