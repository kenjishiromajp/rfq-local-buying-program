import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
import moment from 'moment';
import { $enum } from 'ts-enum-util';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import TenderDetailCard from 'components/TenderDetailCard/TenderDetailCard';
import { useAuth } from 'contexts/authContext';
import { ITender } from 'models/ITender';

import MainLayout from '../../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
  tenders: ITender[];
}

enum TenderState {
  closed = 'Closed',
  active = 'Active',
}

const TendersPage: FC<IProps> = ({ statusCode = null, host = '' }) => {
  const { user } = useAuth();
  const [tenderFilter, setTenderFilter] = useState<TenderState>();
  const [tenders, setTenders] = useState<ITender[]>([]);

  useEffect(() => {
    (async () => {
      try {
        if (user?.Buyer_ID) {
          const {
            data: { items: responseTenders },
          } = await realRequest(`/api/my/tenders`);
          setTenders(responseTenders);
        }
      } catch {
        toast.error('There was an error.');
      }
    })();
  }, [user]);

  const filteredTender = useMemo(() => {
    switch (tenderFilter) {
      case TenderState.closed:
        return tenders.filter(tender => {
          return moment().startOf('day').isAfter(moment(tender.ClosingAt));
        });
      case TenderState.active:
        return tenders.filter(tender => {
          return moment()
            .startOf('day')
            .isSameOrBefore(moment(tender.ClosingAt));
        });
      default:
        return tenders;
    }
  }, [tenderFilter, tenders]);

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
                <h1 className="mb-3">My Tenders</h1>
              </Col>
              <Col md="auto">
                <Row className="align-items-center">
                  <Col md="auto">
                    <Link href="/tenders/create">
                      <Button size="sm" variant="success" as="a">
                        Create Tender
                      </Button>
                    </Link>
                  </Col>
                  <Col md="auto">
                    <ButtonGroup size="sm">
                      <Button
                        onClick={() => setTenderFilter(undefined)}
                        variant={
                          tenderFilter === undefined
                            ? undefined
                            : 'outline-primary'
                        }
                      >
                        All
                      </Button>
                      {$enum(TenderState).map(value => (
                        <Button
                          onClick={() => setTenderFilter(value)}
                          key={value}
                          variant={
                            value === tenderFilter
                              ? 'primary'
                              : 'outline-primary'
                          }
                        >
                          {value}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {filteredTender.map((tender: ITender) => (
                <Col key={tender.ID} sm={6} md={4} lg={3} className="mb-3">
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
