import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import { Badge, Button, ButtonGroup, Col, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
import moment from 'moment';
import { $enum } from 'ts-enum-util';
import getStatusProposal from 'utils/getStatusProposal';
import getVariantByStatus from 'utils/getVariantByStatus';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';
import request from 'utils/request';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { useAuth } from 'contexts/authContext';
import { IProposal } from 'models/IProposal';
import { ProposalStatus } from 'models/ProposalStatus';

import MainLayout from '../../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  proposals: IProposal[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: proposals } = await request.get<IProposal[]>('/proposals');
    return {
      props: {
        proposals,
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

const MyProposalsPage: FC<IProps> = ({ statusCode = null, host = '' }) => {
  const { user } = useAuth();
  const [proposalFilter, setProposalFilter] = useState<ProposalStatus>();
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const filteredProposals = useMemo(() => {
    if (!proposalFilter) {
      return proposals;
    }
    return proposals.filter((proposal: IProposal) => {
      return getStatusProposal(proposal) === proposalFilter;
    });
  }, [proposalFilter, proposals]);

  useEffect(() => {
    (async () => {
      try {
        if (user?.Supplier_ID) {
          const {
            data: { items: responseTenders },
          } = await realRequest(`/api/my/proposals`);
          setProposals(responseTenders);
        }
      } catch {
        toast.error('There was an error.');
      }
    })();
  }, [user]);

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
                <h1 className="mb-3">My Proposals</h1>
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
                              width={70}
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
