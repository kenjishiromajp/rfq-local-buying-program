import {ProposalStatus} from 'models/ProposalStatus';

function getVariantByStatus(statusProposal: ProposalStatus) {
  switch (statusProposal) {
    case ProposalStatus.accepted:
      return 'success';
    case ProposalStatus.denied:
      return 'danger';
    case ProposalStatus.pending:
      return 'info';
    default:
      return undefined;
  }
}
export default getVariantByStatus;
