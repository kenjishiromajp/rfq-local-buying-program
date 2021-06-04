import type { ITender } from 'models/ITender';

export interface ITenderProduct {
  ID: number;
  Name?: string;
  Quantity?: number;
  Tender?: ITender;
  Tender_ID: number;
}
