import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
import realRequest from 'utils/realRequest';
import renderCommonMetaTags from 'utils/renderCommonMetaTags';

import BuyerProfile from 'components/BuyerProfile/BuyerProfile';
import SupplierProfile from 'components/SupplierProfile/SupplierProfile';
import { IBuyer } from 'models/IBuyer';
import { ISupplier } from 'models/ISupplier';

import { useAuth } from '../contexts/authContext';
import MainLayout from '../layouts/MainLayout';

interface IProps {
  statusCode?: number;
  host: string;
}

const MyProfilePage: FC<IProps> = ({ host = '' }) => {
  const { user } = useAuth();
  const [buyer, setBuyer] = useState<IBuyer | undefined>();
  const [supplier, setSupplier] = useState<ISupplier | undefined>();
  useEffect(() => {
    (async () => {
      try {
        if (user?.Buyer_ID) {
          const [
            {
              data: { data: responseBuyer },
            },
            {
              data: { items: responseTenders },
            },
          ] = await Promise.all([
            realRequest(`/api/buyers/${user.Buyer_ID}`),
            realRequest(`/api/my/tenders`),
          ]);
          setBuyer({ ...responseBuyer, Tenders: responseTenders });
        }
        if (user?.Supplier_ID) {
          const {
            data: { data: responseSupplier },
          } = await realRequest(`/api/suppliers/${user.Supplier_ID}`);
          setSupplier(responseSupplier);
        }
      } catch {
        toast.error('There was an error.');
      }
    })();
  }, [user]);

  return (
    <>
      <Head>
        {renderCommonMetaTags(
          'rfq-cres - My Profile Page',
          'My Profile Page - Description',
          undefined,
          `${host}/`,
          undefined,
          'My Profile Page',
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
          {supplier && <SupplierProfile supplier={supplier} />}
          {buyer && (
            <BuyerProfile buyer={buyer} tenders={buyer.Tenders || []} />
          )}
        </motion.div>
      </MainLayout>
    </>
  );
};

export default MyProfilePage;
