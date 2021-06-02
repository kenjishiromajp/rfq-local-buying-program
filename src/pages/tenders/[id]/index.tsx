import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { motion } from 'framer-motion';
import moment from 'moment';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import Navbar from 'components/Navibar/NaviBar';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { useAuth } from 'contexts/authContext';
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
  } = await realRequest.get<{ items: ITender[] }>('/api/tenders');
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
      `/api/tenders/${params?.id || '0'}`,
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
  tender,
}) => {
  const { query, isFallback } = useRouter();
  const { user } = useAuth();

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
        <motion.div
          key="my-tenders"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <Navbar />
          <div>
            <SectionWithContainer
              style={{
                background: `url(${tender.HeadingImage})`,
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
            <Row className="justify-content-between mb-4">
              <Col className="flex-grow-0">
                <h1 className="mb-0">Description</h1>
              </Col>
              <Col md="auto">
                <Row>
                  <Col md="auto">
                    <Button size="sm" variant="outline-info">
                      Attachments
                    </Button>
                  </Col>
                  <Col md="auto">
                    <Button size="sm" variant="outline-primary">
                      Contact the company
                    </Button>
                  </Col>
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
            <div dangerouslySetInnerHTML={{ __html: tender.Description }} />
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default TenderDetailPage;
