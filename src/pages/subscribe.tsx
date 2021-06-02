import { GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Button, Card, Form, FormProps } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-unresolved
import { Except } from 'type-fest';
import realRequest from 'utils/realRequest';

import FormControlFile from 'components/FormControlFile/FormControlFile';
import FormGroupWithLabelAndControl from 'components/FormGroupWithLabelAndControl/FormGroupWithLabelAndControl';
import FormGroupWithLabelAndSelect from 'components/FormGroupWithLabelAndSelect/FormGroupWithLabelAndSelect';
import RowWithOffsetCol from 'components/RowWithOffsetCol/RowWithOffsetCol';
import SectionWithContainer from 'components/SectionWithContainer/SectionWithContainer';
import { useAuth } from 'contexts/authContext';
import { ICity } from 'models/ICity';
import { IState } from 'models/IState';
import { ISupplyCategory } from 'models/ISupplyCategory';

import MainLayout from '../layouts/MainLayout';
import renderCommonMetaTags from '../utils/renderCommonMetaTags';

interface IProps {
  statusCode?: number;
  host: string;
  states: IState[];
  cities: ICity[];
  supplyCategories: ISupplyCategory[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const api = fetcherNextJSAPI();
    // const [] = await Promise.all([
    //   // TODO: Add the requests
    // ]);
    const [
      {
        data: { items: cities },
      },
      {
        data: { items: states },
      },
      {
        data: { items: supplyCategories },
      },
    ] = await Promise.all([
      realRequest('/api/cities'),
      realRequest('/api/states'),
      realRequest('/api/supply_categories'),
    ]);

    return {
      props: {
        cities,
        states,
        supplyCategories,
      },
      revalidate: 10, // time in seconds
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

enum SubscribePageTypes {
  supplier = 'supplier',
  buyer = 'buyer',
}

interface SupplierSubscribeFormProps extends Except<FormProps, 'onSubmit'> {
  onSubmit?: (value: any) => any;
  supplyCategories?: ISupplyCategory[];
  states?: IState[];
  cities?: ICity[];
  loading?: boolean;
}

const SupplierSubscribeForm: FC<SupplierSubscribeFormProps> = ({
  onSubmit = () => {},
  supplyCategories = [],
  states = [],
  cities = [],
  loading,
  ...props
}) => {
  const { register, handleSubmit, control } = useForm();
  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroupWithLabelAndControl
        label="Email"
        controlProps={register('Email', { required: true })}
      />
      <FormGroupWithLabelAndControl
        label="Password"
        controlProps={{
          ...register('Password', { required: true }),
          type: 'password',
        }}
      />
      <FormGroupWithLabelAndControl
        label="Name"
        controlProps={register('Name', { required: true })}
      />
      <FormGroupWithLabelAndControl
        label="ABN"
        controlProps={{
          ...register('ABN', { required: true }),
          type: 'number',
        }}
      />
      <Form.Group>
        <Form.Label>Logo</Form.Label>
        <Controller
          name="Logo"
          control={control}
          render={({ field }) => <FormControlFile {...field} />}
        />
      </Form.Group>
      <FormGroupWithLabelAndControl
        label="Description"
        controlProps={{
          ...register('Description', { required: true }),
          as: 'textarea',
        }}
      />
      <Controller
        name="SupplyCategories"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => (
          <FormGroupWithLabelAndSelect
            label="Supply Categories"
            selectProps={{ options: supplyCategories, isMulti: true, ...field }}
          />
        )}
      />
      <Controller
        name="State_ID"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => (
          <FormGroupWithLabelAndSelect
            label="State"
            selectProps={{
              options: states,
              ...field,
            }}
          />
        )}
      />
      <Controller
        name="City_ID"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => (
          <FormGroupWithLabelAndSelect
            label="City"
            selectProps={{
              options: cities,
              ...field,
            }}
          />
        )}
      />

      <Button disabled={loading} type="submit">
        Register
      </Button>
    </Form>
  );
};

interface BuyerSubscribeFormProps extends Except<FormProps, 'onSubmit'> {
  onSubmit?: (value: any) => any;
  loading?: boolean;
  states: IState[];
  cities: ICity[];
}

const BuyerSubscribeForm: FC<BuyerSubscribeFormProps> = ({
  onSubmit = () => {},
  loading,
  cities,
  states,
  ...props
}) => {
  const { register, handleSubmit, control } = useForm();
  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroupWithLabelAndControl
        label="Email"
        controlProps={register('Email', { required: true })}
      />
      <FormGroupWithLabelAndControl
        label="Password"
        controlProps={{
          ...register('Password', { required: true }),
          type: 'password',
        }}
      />
      <FormGroupWithLabelAndControl
        label="Name"
        controlProps={register('Name', { required: true })}
      />
      <FormGroupWithLabelAndControl
        label="ABN"
        controlProps={{
          ...register('ABN', { required: true }),
          type: 'number',
        }}
      />
      <Form.Group>
        <Form.Label>Logo</Form.Label>
        <Controller
          name="Logo"
          control={control}
          render={({ field }) => <FormControlFile {...field} />}
        />
      </Form.Group>
      <Controller
        name="State_ID"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => (
          <FormGroupWithLabelAndSelect
            label="State"
            selectProps={{
              options: states,
              ...field,
            }}
          />
        )}
      />
      <Controller
        name="City_ID"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => (
          <FormGroupWithLabelAndSelect
            label="City"
            selectProps={{
              options: cities,
              ...field,
            }}
          />
        )}
      />
      <Button disabled={loading} type="submit">
        Register
      </Button>
    </Form>
  );
};

const SubscribePage: FC<IProps> = ({
  supplyCategories,
  cities,
  states,
  statusCode = null,
  host = '',
}) => {
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);
  const type = query.type as SubscribePageTypes;
  const { login, createUser } = useAuth();
  const router = useRouter();
  if (statusCode) {
    return <ErrorPage statusCode={statusCode} />;
  }

  const onSubmit = async (value: any) => {
    setLoading(true);
    try {
      await createUser({
        ...value,
        Type: type,
        SupplyCategories: (value.SupplyCategories || []).map(({ ID }) => ID),
        State_ID: value.State_ID?.ID,
        City_ID: value.City_ID?.ID,
      });
      toast.success('Created with success!', {
        position: 'top-right',
      });
      await login(value.Email, value.Password);
      await router.push('/');
    } catch (error) {
      toast.error(error, {
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        {renderCommonMetaTags(
          'rfq-cres - Subscribe Page',
          'Subscribe Page - Description',
          undefined,
          `${host}/`,
          undefined,
          'Subscribe Page',
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
          <SectionWithContainer className="bg-light-grey">
            <RowWithOffsetCol offset={2}>
              <Card>
                <Card.Body>
                  <h1 className="mb-5">
                    Subscribe as {(type || '').toLocaleUpperCase()}
                  </h1>
                  {SubscribePageTypes.buyer === type ? (
                    <BuyerSubscribeForm
                      cities={cities}
                      states={states}
                      loading={loading}
                      onSubmit={onSubmit}
                    />
                  ) : (
                    <SupplierSubscribeForm
                      cities={cities}
                      states={states}
                      supplyCategories={supplyCategories}
                      loading={loading}
                      onSubmit={onSubmit}
                    />
                  )}
                </Card.Body>
              </Card>
            </RowWithOffsetCol>
          </SectionWithContainer>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default SubscribePage;
