import { IBuyer } from 'models/IBuyer';
import { ICity } from 'models/ICity';
import { IState } from 'models/IState';
import { ISupplyCategory } from 'models/ISupplyCategory';

export interface ITender {
  ID: number;
  Buyer_ID?: number;
  Buyer?: IBuyer;
  PublishedAt?: string;
  ClosingAt?: string;
  Title: string;
  HeadingImage: string;
  Description: string;
  State_ID?: number;
  State?: IState;
  City_ID?: number;
  City?: ICity;
  Offer?: number;
  DeletedAt?: string;
  CreatedAt: string;
  UpdatedAt?: string;
  SupplyCategories?: ISupplyCategory[];
}
