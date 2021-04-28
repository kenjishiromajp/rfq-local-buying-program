import moment from 'moment';

import { IProposal } from 'models/IProposal';
import { ProposalStatus } from 'models/ProposalStatus';

const getStatusProposal = (proposal: IProposal): ProposalStatus => {
  if (proposal.ApprovedAt) {
    return ProposalStatus.accepted;
  }

  if (
    moment().startOf('day').isSameOrBefore(moment(proposal.Tender?.ClosingAt))
  ) {
    return ProposalStatus.pending;
  }

  return ProposalStatus.denied;
};

export default getStatusProposal;
