import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
import realRequest from 'utils/realRequest';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { useAuth } from 'contexts/authContext';
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

const LoginPage: FC<IProps> = ({ statusCode = null, host = '' }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);

  if (statusCode) {
    return <ErrorPage statusCode={statusCode} />;
  }

  const onSubmit = async (value: any) => {
    setLoading(true);
    try {
      const response = await realRequest.post('/api/auth/login', value);
      if (response.data.success) {
        await login(value.Email, value.Password);
        toast.success('Login with success!', {
          position: 'top-right',
        });
        await router.push('/');
      }
    } catch (error) {
      toast.error(`Error in authentication`, {
        position: 'top-right',
      });
      console.error(error);
    }
    setLoading(false);
  };
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
          <SectionWithContainer className="bg-primary vh-100 d-flex align-items-center justify-content-between">
            <Row>
              <Col className="offset-md-4" md={4}>
                <Card>
                  <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control {...register('Email')} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          {...register('Password')}
                          type="password"
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-100 mt-3 mb-3"
                      >
                        Login
                      </Button>
                      <p className="text-center">
                        Don't you have an account? <br />
                        <Link href="/subscribe?type=buyer" passHref>
                          <Button
                            as="a"
                            variant="link"
                            size="sm"
                            className="d-block"
                          >
                            Subscribe as a Buyer
                          </Button>
                        </Link>
                        <Link href="/subscribe?type=supplier" passHref>
                          <Button
                            as="a"
                            variant="link"
                            size="sm"
                            className="d-block"
                          >
                            Subscribe as a Supplier
                          </Button>
                        </Link>
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default LoginPage;
