import { IAdEvent } from 'ubimo-ad-dispatcher';

export interface ExtendIAdEvent extends IAdEvent {
  time?: number;
  id?: number;
  isActive?: boolean;
}
