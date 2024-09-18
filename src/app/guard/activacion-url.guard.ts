import { CanActivateFn } from '@angular/router';

export const activacionUrlGuard: CanActivateFn = (route, state) => {
  console.log('path: ',state.url)
  return true;
};
