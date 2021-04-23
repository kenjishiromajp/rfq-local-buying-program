import ErrorPage from 'next/error';
import Head from 'next/head';
import { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { motion } from 'framer-motion';

import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';

import MainLayout from '../layouts/MainLayout';
import renderCommonMetaTags from '../utils/renderCommonMetaTags';

interface IProps {
  statusCode?: number;
  host: string;
}

const LoginPage: FC<IProps> = ({ statusCode = null, host = '' }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  if (statusCode) {
    return <ErrorPage statusCode={statusCode} />;
  }
  const handleOnSubmit = async () => {
    await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    }).then(res => {
      if (res.ok) res.json();
    });
    // to do auth
    // .then( data => {
    //     if(data.authCheck)
    //       console.log("Login success")
    //     else
    //       console.log
    // })
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
          <SectionWithContainer>
            <h1>Login Page</h1>
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User name"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formUserPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleOnSubmit}>
                Submit
              </Button>
            </Form>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default LoginPage;
