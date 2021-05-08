import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { motion } from 'framer-motion';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import LocalBusinessCard from 'components/ProfileCards/LocalBusinessCard';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { ISupplier } from 'models/ISupplier';

import MainLayout from '../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  suppliers: ISupplier[];
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
    return {
      props: {
        suppliers: [supplier, supplier, supplier, supplier, supplier],
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

const profilesPage: FC<IProps> = ({
  suppliers,
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
          key="my-tenders"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <SectionWithContainer>
            <Row className="justify-content-between">
              <Col md="auto">
                <h1 className="mb-3">Local Busyness Profiles</h1>
              </Col>
            </Row>
            {suppliers.map((supplier: ISupplier) => (
              <LocalBusinessCard key={supplier.ID} supplier={supplier} />
            ))}
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default profilesPage;
