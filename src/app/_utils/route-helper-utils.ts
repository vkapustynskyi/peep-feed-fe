import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

const getDeepestChild = (routeSnapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot =>
  routeSnapshot.firstChild ? getDeepestChild(routeSnapshot.firstChild) : routeSnapshot;

export const getLatestActivatedRoute = (route: ActivatedRoute): ActivatedRoute =>
  route.firstChild ? getLatestActivatedRoute(route.firstChild) : route;

export const getParamFromRoute = (
  routeSnapshot: ActivatedRouteSnapshot,
  param: string,
  paramType: RouteParamTypes,
  goDeepIntoChild = true,
): any => {
  let rtSnapshot = routeSnapshot;

  if (goDeepIntoChild) {
    rtSnapshot = getDeepestChild(routeSnapshot);
  }

  if (!routeSnapshot) {
    return null;
  }

  if (rtSnapshot?.[paramType]?.[param]) {
    return rtSnapshot?.[paramType]?.[param];
  }

  return getParamFromRoute(rtSnapshot.parent, param, paramType, false);
};

export const enum RouteParamTypes {
  data = 'data',
  params = 'params',
  routeConfig = 'routeConfig',
  queryParams = 'queryParams',
}
