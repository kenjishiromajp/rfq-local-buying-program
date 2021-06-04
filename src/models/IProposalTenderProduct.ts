import { ITenderProduct } from 'models/ITenderProduct';

export interface IProposalTenderProduct {
  ID: number;
  Name: string;
  Offer: number;
  Tender_ID: number;
  TenderProduct_ID: number;
  TenderProduct?: ITenderProduct;
}
