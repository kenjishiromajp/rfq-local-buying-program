import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { motion } from 'framer-motion';
import moment from 'moment';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { IProposal } from 'models/IProposal';

import MainLayout from '../../layouts/MainLayout';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // See the "fallback" section below
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const {
      data: { data: proposal },
    } = await realRequest.get<{ data: IProposal }>(
      `/api/proposals/${params?.id || '0'}`,
    );
    return {
      props: {
        proposal,
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
interface IProps {
  statusCode?: number;
  host: string;
  proposal: IProposal;
}

const ProposalDetailPage: FC<IProps> = ({
  proposal,
  statusCode = null,
  host = '',
}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h2>...Loading</h2>;
  }
  if (statusCode || !proposal) {
    return <ErrorPage statusCode={statusCode || 400} />;
  }
  return (
    <>
      <Head>
        {renderCommonMetaTags(
          'rfq-cres - Subscribe Page',
          'Subscribe Page - Description',
          undefined,
          `${host}/`,
          undefined,
          'Subscribe Page',
          undefined,
        )}
      </Head>
      <MainLayout>
        <motion.div
          key="homepage"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <SectionWithContainer>
            <h4>{proposal.Tender?.Title}</h4>
            <div>
              <small className="d-block">ESTIMATED DELIVERY</small>
              <span>
                {moment(proposal.Tender?.ClosingAt).format('DD/MM/YYYY')}
              </span>
              <Row className="justify-content-between">
                <Col md="auto">
                  <Row>
                    <Col md="auto">
                      <img
                        className="img-thumbnail"
                        src={proposal.Supplier?.Logo}
                        alt={proposal.Supplier?.Name}
                        width={80}
                      />
                    </Col>
                    <Col md="auto">
                      <strong className="d-block">
                        {proposal.Supplier?.Name}
                      </strong>
                      <span className="text-success">{proposal.Offer}</span>
                    </Col>
                  </Row>
                </Col>
                <Col md="auto">
                  <Row>
                    <Col md="auto">
                      <Button size="sm" variant="outline-success">
                        <strong>4</strong> Attachments
                      </Button>
                    </Col>
                    <Col md="auto">
                      <Button size="sm" variant="outline-primary">
                        Contact the local business
                      </Button>
                    </Col>
                    <Col md="auto">
                      <Button size="sm" variant="success">
                        Choose the company
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </SectionWithContainer>
          <SectionWithContainer>
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: proposal.Description }} />
            <ul className="pl-0">
              {(proposal.ProposalTenderProducts || []).map(
                proposalTenderProduct => (
                  <li key={proposalTenderProduct.ID} className="mb-3">
                    <Card body>
                      <Row className="align-items-center justify-content-between">
                        <Col>
                          <h3 className="m-0">
                            {proposalTenderProduct.TenderProduct?.Name}
                          </h3>
                        </Col>
                        <Col md="auto">
                          <strong className="mr-2">Offer:</strong>
                          <span>{proposalTenderProduct.Offer}</span>
                        </Col>
                      </Row>
                    </Card>
                  </li>
                ),
              )}
            </ul>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default ProposalDetailPage;
