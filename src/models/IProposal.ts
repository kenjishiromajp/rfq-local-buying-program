import { IProposalTenderProduct } from 'models/IProposalTenderProduct';
import type { ISupplier } from 'models/ISupplier';
import type { ITender } from 'models/ITender';

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
  ProposalTenderProducts?: IProposalTenderProduct[];
}
