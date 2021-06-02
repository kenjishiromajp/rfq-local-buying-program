import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

import { motion } from 'framer-motion';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import Navbar from 'components/Navibar/NaviBar';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import TenderDetailCard from 'components/TenderDetailCard/TenderDetailCard';
import { ITender } from 'models/ITender';

import MainLayout from '../../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  tenders: ITender[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const {
      data: { items: tenders },
    } = await realRequest.get<{ items: ITender[] }>('/api/tenders');
    return {
      props: {
        tenders,
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

const TendersPage: FC<IProps> = ({ tenders, statusCode = null, host = '' }) => {
  const [search, setSearch] = useState<string>('');
  const filteredTender = useMemo(() => {
    return tenders.filter(tender => {
      return tender.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }, [search, tenders]);

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
          <SectionWithContainer>
            <Row className="justify-content-between">
              <Col md="auto">
                <h1 className="mb-3">Tenders</h1>
              </Col>
            </Row>
            <Row className="justify-content-md-center mt-4">
              <h4 className="text-center">Looking for current tenders?</h4>
            </Row>
            <Row className="justify-content-md-center mt-3">
              <Col lg="6">
                <Form.Control
                  value={search}
                  onChange={({ target: { value } }) => {
                    setSearch(value);
                  }}
                />
              </Col>
              <Col md="auto">
                <Button>Search</Button>
              </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
              <h3 className="text-center">Open tenders</h3>
            </Row>
            <Row className="mt-2">
              {filteredTender.map((tender: ITender) => (
                <Col key={tender.ID} md={3} className="mb-3">
                  <Link href={`/tenders/${tender.ID}`} passHref>
                    <Button
                      variant="link"
                      className="p-0 text-dark text-left radius-0 d-block"
                      as="a"
                    >
                      <TenderDetailCard tender={tender} />
                    </Button>
                  </Link>
                </Col>
              ))}
            </Row>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default TendersPage;
