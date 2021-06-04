import { IBuyer } from 'models/IBuyer';
import { ICity } from 'models/ICity';
import { IProposal } from 'models/IProposal';
import { IState } from 'models/IState';
import { ISupplyCategory } from 'models/ISupplyCategory';
import { ITenderProduct } from 'models/ITenderProduct';

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
  TenderProducts?: ITenderProduct[];
  Proposals?: IProposal[];
}
