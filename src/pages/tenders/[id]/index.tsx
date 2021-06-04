import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Row,
  Tab,
  Table,
  Tabs,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
import moment from 'moment';
import getStatusProposal from 'utils/getStatusProposal';
import getVariantByStatus from 'utils/getVariantByStatus';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import Navbar from 'components/Navibar/NaviBar';
import RowWithOffsetCol from 'components/RowWithOffsetCol/RowWithOffsetCol';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { useAuth } from 'contexts/authContext';
import { IProposal } from 'models/IProposal';
import { ITender } from 'models/ITender';

import MainLayout from '../../../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  tender: ITender;
}

export const getStaticPaths = async () => {
  const {
    data: { items: tenders },
  } = await realRequest.get<{ items: ITender[] }>(
    'http://localhost:3000/api/tenders',
  );
  return {
    paths: tenders.map(tender => ({
      params: { id: tender.ID.toString() },
    })),
    fallback: true, // See the "fallback" section below
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const {
      data: { data: tender },
    } = await realRequest.get<{ data: ITender[] }>(
      `http://localhost:3000/api/tenders/${params?.id || '0'}`,
    );
    return {
      props: {
        tender,
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

const TenderDetailPage: FC<IProps> = ({
  statusCode = null,
  host = '',
  tender: initialTender,
}) => {
  const { query, isFallback } = useRouter();
  const { user } = useAuth();

  const [tender, setTender] = useState<ITender>(initialTender);

  const description = useMemo(
    () => (
      <>
        <div
          className="pt-4"
          dangerouslySetInnerHTML={{ __html: tender.Description }}
        />
        <div>
          <hr />
          <h4 className="mb-3 font-weight-bold">Products Required</h4>
          <ul className="pl-0">
            {(tender.TenderProducts || []).map(tenderProduct => (
              <li key={tenderProduct.ID} className="mb-3">
                <Card body>
                  <Row className="align-items-center justify-content-between">
                    <Col>
                      <h3 className="m-0">{tenderProduct.Name}</h3>
                    </Col>
                    <Col md="auto">
                      <strong className="mr-2">Quantity:</strong>
                      <span>{tenderProduct.Quantity}</span>
                    </Col>
                  </Row>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
    [tender.Description, tender.TenderProducts],
  );

  useEffect(() => {
    (async () => {
      try {
        if (user?.Buyer_ID) {
          const {
            data: { data: responseTender },
          } = await realRequest(`/api/tenders/${query.id}`);
          setTender(responseTender);
        }
      } catch {
        toast.error('There was an error.');
      }
    })();
  }, [query.id, user]);

  if (isFallback) {
    return <h2>...Loading</h2>;
  }

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
        <Navbar />
        <motion.div
          key="my-tenders"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <div>
            <SectionWithContainer
              style={{
                background: `url(${
                  tender.HeadingImage ||
                  'https://images.unsplash.com/photo-1605843799949-dd30451e2fc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80'
                })`,
                backgroundSize: 'cover',
              }}
            >
              <div className="text-white">
                <h5>Estimated Delivery</h5>
                <h4 className="font-weight-bold">
                  {moment(tender.ClosingAt).format('DD/MM/YYYY')}
                </h4>
                <h3 className="font-weight-bold">{tender.Buyer?.Name}</h3>
                <h1 className="font-weight-bold">{tender.Title}</h1>
              </div>
            </SectionWithContainer>
          </div>
          <SectionWithContainer>
            <RowWithOffsetCol>
              <Row className="justify-content-between mb-4">
                <Col className="flex-grow-0">
                  <h4 className="font-weight-bold">Description</h4>
                </Col>
                <Col md="auto">
                  <Row>
                    <Col md="auto">
                      <Button size="sm" variant="outline-info">
                        Attachments
                      </Button>
                    </Col>
                    {tender.Buyer?.User?.Email && (
                      <Col md="auto">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          as="a"
                          href={`mailto:${tender.Buyer.User.Email}`}
                        >
                          Contact the company
                        </Button>
                      </Col>
                    )}
                    {user?.Supplier_ID && (
                      <Col md="auto">
                        <Link
                          href={`/tenders/${query.id}/create-proposal`}
                          passHref
                        >
                          <Button as="a" size="sm" variant="success">
                            Submit a quote
                          </Button>
                        </Link>
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
              <hr />
              {user?.Buyer_ID === tender.Buyer_ID ? (
                <Tabs
                  defaultActiveKey="description"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="description" title="Description">
                    {description}
                  </Tab>
                  <Tab eventKey="proposals" title="Proposals">
                    <div className="pt-4">
                      <Table borderless>
                        <thead>
                          <th>COMPANY NAME</th>
                          {(tender.TenderProducts || [])
                            .sort(({ ID }) => ID)
                            .map(tenderProduct => (
                              <th key={tenderProduct.ID}>
                                {tenderProduct.Name} PRICE
                              </th>
                            ))}
                          <th>SUBMITTED AT</th>
                          <th />
                        </thead>
                        <tbody>
                          {(tender.Proposals || []).map(
                            (proposal: IProposal) => {
                              const statusProposal = getStatusProposal(
                                proposal,
                              );
                              const variantByStatus = getVariantByStatus(
                                statusProposal,
                              );
                              return (
                                <tr key={proposal.ID}>
                                  <td>
                                    <Link
                                      href={`/proposals/${proposal.ID}`}
                                      passHref
                                    >
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
                                  {(proposal.ProposalTenderProducts || [])
                                    .sort(
                                      ({ TenderProduct_ID }) =>
                                        TenderProduct_ID,
                                    )
                                    .map(proposalTenderProduct => (
                                      <td key={proposalTenderProduct.ID}>
                                        {proposalTenderProduct.Offer}
                                      </td>
                                    ))}
                                  <td>
                                    {moment(proposal.CreatedAt).format(
                                      'DD/MM/YYYY',
                                    )}
                                  </td>
                                  <td>
                                    <Badge
                                      variant={`outline-${variantByStatus}`}
                                    >
                                      <span
                                        className={`text-${variantByStatus}`}
                                      >
                                        {statusProposal}
                                      </span>
                                    </Badge>
                                  </td>
                                </tr>
                              );
                            },
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Tab>
                </Tabs>
              ) : (
                description
              )}
            </RowWithOffsetCol>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default TenderDetailPage;
