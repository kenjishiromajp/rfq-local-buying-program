import {ITender} from 'models/ITender';
import {ISupplier} from 'models/ISupplier';

export interface IProposal {
  ID: number;
  Tender_ID?: number;
  Tender?: ITender;
  Supplier_ID?: number;
  Supplier?: ISupplier;
  Description: string;
  ApprovedAt?: string;
  Offer?: number;
  CreatedAt: string;
  UpdatedAt?: string;
  DeletedAt?: string;
}
