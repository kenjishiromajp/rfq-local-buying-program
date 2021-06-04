import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useRef, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Editor } from '@tinymce/tinymce-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import RowWithOffsetCol from 'components/RowWithOffsetCol/RowWithOffsetCol';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
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
    } = await realRequest.get<{ data: ITender }>(
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

const CreateProposalPage: FC<IProps> = ({
  tender,
  statusCode = null,
  host = '',
}) => {
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (statusCode) {
    return <ErrorPage statusCode={statusCode} />;
  }

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      const { data: createProposalResponse } = await realRequest.post(
        '/api/proposals',
        {
          Tender_ID: tender.ID,
          ...values,
        },
      );
      toast.success('Created successfully');
      if (createProposalResponse?.data?.ID) {
        router.push(`/proposals/${createProposalResponse.data.ID}`);
      }
    } catch (error) {
      toast.error('Something happened');
    }
    setLoading(false);
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
          <SectionWithContainer className="bg-primary d-flex justify-content-between flex-column flex-grow-1">
            <RowWithOffsetCol offset={2}>
              <Card
                body
                style={{ background: `url(${tender.HeadingImage})` }}
                className="mb-3"
              >
                <Row>
                  <Col md="auto">
                    <span className="text-white">Logo</span>
                  </Col>
                  <Col md="auto">
                    <h5 className="d-block text-white">ESTIMATED DELIVERY</h5>
                    <span className="text-white">
                      {moment(tender.ClosingAt).format('DD/MM/YYYY')}
                    </span>
                  </Col>
                </Row>
              </Card>
              <Card>
                <Card.Body className="p-4">
                  <h3>Create Proposal</h3>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                      <Form.Label>
                        Can you describe your solution / product?
                      </Form.Label>
                      <Controller
                        name="Description"
                        control={control}
                        render={({ field }) => (
                          <Editor
                            onInit={(evt: any, editor: any) => {
                              editorRef.current = editor;
                            }}
                            value={field.value}
                            onSelectionChange={(_, editor) => {
                              const html = editor.getContent();
                              field.onChange(html);
                            }}
                            init={{
                              zIndex: 0,
                              height: 300,
                              menubar: false,
                              content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                          />
                        )}
                      />
                      {errors.Description && (
                        <span className="text-error">{errors.Description}</span>
                      )}
                    </Form.Group>

                    {tender.TenderProducts?.map((tenderProduct, index) => (
                      <Form.Group key={tenderProduct.ID}>
                        <Card body>
                          <Row className="align-items-center justify-content-between">
                            <Col xs="auto">
                              <h3 className="m-0">{tenderProduct.Name}</h3>
                            </Col>
                            <Col xs="auto">
                              <Form.Label>Your Price</Form.Label>
                              <Form.Control
                                type="number"
                                {...register(
                                  `ProposalTenderProducts.${index}.Offer`,
                                  {
                                    valueAsNumber: true,
                                  },
                                )}
                              />
                            </Col>
                          </Row>
                          <Form.Control
                            type="hidden"
                            {...register(
                              `ProposalTenderProducts.${index}.TenderProduct_ID`,
                              {
                                valueAsNumber: true,
                              },
                            )}
                            value={tenderProduct.ID}
                          />
                        </Card>
                      </Form.Group>
                    ))}
                    <Form.Group>
                      <Button disabled={loading} type="submit">
                        Register
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </RowWithOffsetCol>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default CreateProposalPage;
