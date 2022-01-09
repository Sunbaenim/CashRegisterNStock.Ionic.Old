import { Status } from '../enums/status.enum';

export interface OrderUpdateModel {
  id: number;
  status: Status;
};
