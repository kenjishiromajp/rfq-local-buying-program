import { ICity } from 'models/ICity';
import { IState } from 'models/IState';
import { ISupplyCategory } from 'models/ISupplyCategory';

import type { ITender } from './ITender';

export interface ISupplier {
  ID: number;
  Name: string;
  ABN: string;
  Logo: string;
  Description: string;
  CreatedAt: string;
  UpdatedAt?: string;
  DeletedAt?: string;
  SupplyCategories?: ISupplyCategory[];
  State_ID: number;
  State?: IState;
  City_ID: number;
  City?: ICity;
  Tenders?: ITender[];
}
