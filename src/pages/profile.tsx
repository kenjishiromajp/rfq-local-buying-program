import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { FC } from 'react';
import { Col, Row, Card } from 'react-bootstrap';

import { motion } from 'framer-motion';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { IProfile } from 'models/IProfile';

import MainLayout from '../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  profile: IProfile;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const api = fetcherNextJSAPI();
    // const [] = await Promise.all([
    //   // TODO: Add the requests
    // ]);
    const profile: IProfile = {
      ID: 1,
      Name: 'My Name',
      Email: 'MyEmail@mail.com',
      Supplier_ID: 0,
      Buyer_ID: 0,
      Buyer_Name: 'Buyer Name',
      Buyer_ABN: 1122335566,
      Buyer_Logo: 'Buyer Logo',
      Supplier_Name: 'Supplier Name',
      Supplier_ABN: 9876543210,
      Supplier_Logo: 'Supplier Logo',
    };
    return {
      props: {
        profile,
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

const ProfilePage: FC<IProps> = ({ profile, statusCode = null, host = '' }) => {
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
                <h1 className="mb-3">My Profile</h1>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <Card body style={{ width: '80%' }}>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Name</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Name}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Email</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Email}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Buyer Name</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Buyer_Name}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Buyer ABN</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Buyer_ABN}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Buyer Logo</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Buyer_Logo}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Supplier Name</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Supplier_Name}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Supplier ABN</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Supplier_ABN}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <h5>
                        <b>Buyer Logo</b>
                      </h5>
                    </Col>
                    <Col md="7">
                      <h5>{profile.Supplier_Logo}</h5>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default ProfilePage;
