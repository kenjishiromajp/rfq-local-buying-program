import type { ICity } from 'models/ICity';
import type { IState } from 'models/IState';
import { IUser } from 'models/IUser';

import type { ITender } from './ITender';

export interface IBuyer {
  ID: number;
  Name: string;
  ABN: string;
  Logo: string;
  Description?: string;
  State_ID: number;
  State?: IState;
  City_ID: number;
  City?: ICity;
  CreatedAt: string;
  UpdatedAt?: string;
  DeletedAt?: string;
  Tenders?: ITender[];
  User?: IUser;
}
