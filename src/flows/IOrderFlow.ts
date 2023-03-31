import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import type { IOrderModule, IOrderReviewModule } from '@/modules/IOrderModule';

export interface IOrderFlow {
  path: string;
  name: RouteRecordName;
  layoutComponent: RouteRecordRaw['component'];
  route: RouteRecordRaw;
  introModules: IOrderModule[];
  orderLayoutComponent: RouteRecordRaw['component'];
  reviewModules: IOrderReviewModule[];
}

// Example of final routing object. This needs to be dynamically built by the navigation store
const routes = [
  {
    component: 'layout component', // fetch app/getStarted config
    children: [
      // introRoutes from introModules.
      {
        component: 'orderLayout component', // fetch order config
        children: [
          // catch all route to be removed after order config fetched and order modules loaded
          // orderRoutes from dynamic orderModules
          // reviewRoutes from reviewModules
        ],
      },
    ],
  },
];

// Note: When the navigationStore is on the last introModule and is asked to go the nextModule
// it needs to navigate to some url (I think /order-start or something along those lines) that
// will be caught by the catch-all under the orderLayout component then after the orderLayout
// fetches the orderConfig and loads in the dynamic orderModules it needs to redirect to
// the first orderModule
