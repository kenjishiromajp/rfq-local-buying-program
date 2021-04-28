import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { Badge, Button, ButtonGroup, Col, Row, Table } from 'react-bootstrap';

import { motion } from 'framer-motion';
import moment from 'moment';
import { $enum } from 'ts-enum-util';
import getStatusProposal from 'utils/getStatusProposal';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { IProposal } from 'models/IProposal';
import { ISupplier } from 'models/ISupplier';
import { ITender } from 'models/ITender';
import { ProposalStatus } from 'models/ProposalStatus';

import MainLayout from '../../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  proposals: IProposal[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const api = fetcherNextJSAPI();
    // const [] = await Promise.all([
    //   // TODO: Add the requests
    // ]);
    const supplier: ISupplier = {
      ABN: '21321',
      ID: 1,
      Name: 'Name',
      Logo:
        'https://images.unsplash.com/photo-1584715787746-75b93b83bf14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
      Description: 'Description',
      State_ID: 1,
      State: {
        ID: 1,
        Name: 'City',
        Acronym: 'CIT',
      },
      City_ID: 1,
      City: {
        ID: 1,
        Name: 'Cool City',
        State_ID: 1,
      },
      DeletedAt: '2022-03-01',
      CreatedAt: '2022-03-01',
      UpdatedAt: '2022-03-01',
      SupplyCategories: [
        {
          ID: 1,
          Name: 'Name',
          Description: 'Name',
        },
        {
          ID: 1,
          Name: 'Name',
          Description: 'Other Name',
        },
      ],
    };

    const tender: ITender = {
      ID: 1,
      Buyer_ID: 1,
      Buyer: {
        ID: 1,
        Name: 'Name',
        ABN: 'ABN',
        Logo: 'Logo',
        CreatedAt: '2020-08-01',
        UpdatedAt: '2020-08-01',
        DeletedAt: '2020-08-01',
      },
      PublishedAt: '2022-03-01',
      ClosingAt: '2021-04-21',
      Title: 'Title',
      HeadingImage:
        'https://images.unsplash.com/photo-1584715787746-75b93b83bf14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
      Description: 'Description',
      State_ID: 1,
      State: {
        ID: 1,
        Name: 'City',
        Acronym: 'CIT',
      },
      City_ID: 1,
      City: {
        ID: 1,
        Name: 'Cool City',
        State_ID: 1,
      },
      Offer: 2323.23,
      DeletedAt: '2022-03-01',
      CreatedAt: '2022-03-01',
      UpdatedAt: '2022-03-01',
      SupplyCategories: [
        {
          ID: 1,
          Name: 'Name',
          Description: 'Name',
        },
        {
          ID: 1,
          Name: 'Name',
          Description: 'Other Name',
        },
      ],
    };

    const proposal: IProposal = {
      ID: 1,
      CreatedAt: '2020-03-01',
      Description: 'Description',
      Offer: 12321.22,
      Supplier: supplier,
      Supplier_ID: 1,
      Tender: tender,
      Tender_ID: 0,
      UpdatedAt: '',
    };
    return {
      props: {
        proposals: [
          proposal,
          proposal,
          proposal,
          proposal,
          proposal,
          proposal,
          proposal,
          proposal,
        ],
      },
      revalidate: 60, // time in seconds
    };
  } catch (error) {
    console.error('[ERROR]', error);
    return {
      props: {
        statusCode: error.status || null,
      },
      revalidate: 1, // time in seconds
    };
  }
};

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

const MyProposalsPage: FC<IProps> = ({
  proposals,
  statusCode = null,
  host = '',
}) => {
  const [proposalFilter, setProposalFilter] = useState<ProposalStatus>();
  const filteredProposals = useMemo(() => {
    if (!proposalFilter) {
      return proposals;
    }
    return proposals.filter((proposal: IProposal) => {
      return getStatusProposal(proposal) === proposalFilter;
    });
  }, [proposalFilter, proposals]);

  if (statusCode) {
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <>
      <Head>
        {renderCommonMetaTags(
          'rfq-cres',
          'rfq-cres Description',
          undefined,
          `${host}/`,
          undefined,
          'rfq-cres',
          undefined,
        )}
      </Head>
      <MainLayout>
        <motion.div
          key="my-proposals"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <SectionWithContainer>
            <Row className="justify-content-between">
              <Col md="auto">
                <h1 className="mb-3">My Tenders</h1>
              </Col>
              <Col md="auto">
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => setProposalFilter(undefined)}
                    variant={
                      proposalFilter === undefined
                        ? undefined
                        : 'outline-primary'
                    }
                  >
                    All
                  </Button>
                  {$enum(ProposalStatus).map(value => (
                    <Button
                      onClick={() => setProposalFilter(value)}
                      key={value}
                      variant={
                        value === proposalFilter ? 'primary' : 'outline-primary'
                      }
                    >
                      {value}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
            <Table borderless>
              <thead>
                <th>COMPANY NAME</th>
                <th>QUOTE PRICE</th>
                <th>SUBMITTED AT</th>
                <th />
              </thead>
              <tbody>
                {filteredProposals.map((proposal: IProposal) => {
                  const statusProposal = getStatusProposal(proposal);
                  const variantByStatus = getVariantByStatus(statusProposal);
                  return (
                    <tr key={proposal.ID}>
                      <td>
                        <Link href={`/proposals/${proposal.ID}`} passHref>
                          <a className="d-flex align-items-center">
                            <img
                              className="mr-2 d-flex img-thumbnail"
                              src={proposal.Tender?.Buyer?.Logo}
                              alt={proposal.Tender?.Buyer?.Name}
                            />
                            {proposal.Tender?.Buyer?.Name} -{' '}
                            {proposal.Tender?.Title}
                          </a>
                        </Link>
                      </td>
                      <td>{proposal.Offer}</td>
                      <td>{moment(proposal.CreatedAt).format('DD/MM/YYYY')}</td>
                      <td>
                        <Badge variant={`outline-${variantByStatus}`}>
                          <span className={`text-${variantByStatus}`}>
                            {statusProposal}
                          </span>
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default MyProposalsPage;
