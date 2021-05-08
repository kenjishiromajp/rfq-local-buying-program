import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { motion } from 'framer-motion';

// import NaviBar from 'components/Navibar/NaviBar';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import SupplierDetailCard from 'components/TenderDetailCard/SupplierDetailCard';
import TenderDetailCard from 'components/TenderDetailCard/TenderDetailCard';
import { ISupplier } from 'models/ISupplier';
import { ITender } from 'models/ITender';

import MainLayout from '../layouts/MainLayout';
import renderCommonMetaTags from '../utils/renderCommonMetaTags';

interface IProps {
  statusCode?: number;
  host: string;
  tenders: ITender[];
  suppliers: ISupplier[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const api = fetcherNextJSAPI();
    // const [] = await Promise.all([
    //   // TODO: Add the requests
    // ]);
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
      ClosingAt: '2022-03-01',
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
    return {
      props: {
        tenders: [tender, tender, tender, tender],
        suppliers: [supplier, supplier, supplier, supplier],
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

const HomePage: FC<IProps> = ({
  suppliers,
  tenders,
  statusCode = null,
  host = '',
}) => {
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
          key="homepage"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <SectionWithContainer>
            <div className="d-flex flex-column align-items-center mb-3">
              <h1 className="text-center">
                Connecting local business to big companies
              </h1>
              <h4>What are you looking for?</h4>
            </div>
            <Row className="justify-content-center">
              <Col md="auto">
                <Link href="/subscribe?type=buyer">
                  <Button as="a">Subscribe as a Buyer</Button>
                </Link>
              </Col>
              <Col md="auto">
                <Link href="/subscribe?type=supplier">
                  <Button variant="success">
                    Subscribe as a Local Business
                  </Button>
                </Link>
              </Col>
            </Row>
          </SectionWithContainer>
          <SectionWithContainer>
            <h2 className="mb-3">Tenders</h2>
            <Row>
              {tenders.map((tender: ITender) => (
                <Col key={tender.ID} md={3}>
                  <Link href={`/tenders/${tender.ID}`} passHref>
                    <Button
                      variant="link"
                      className="p-0 text-dark text-left radius-0"
                      as="a"
                    >
                      <TenderDetailCard tender={tender} />
                    </Button>
                  </Link>
                </Col>
              ))}
            </Row>
          </SectionWithContainer>
          <SectionWithContainer>
            <h2 className="mb-3">Local Business</h2>
            <Row>
              {suppliers.map((supplier: ISupplier) => (
                <Col key={supplier.ID} md={3}>
                  <Link href={`/suppliers/${supplier.ID}`} passHref>
                    <Button
                      variant="link"
                      className="p-0 text-dark text-left radius-0"
                      as="a"
                    >
                      <SupplierDetailCard supplier={supplier} />
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

export default HomePage;
