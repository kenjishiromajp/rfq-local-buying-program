// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as next from 'next';

import admin from 'firebase-admin';
// import moment from 'moment';

declare module 'next' {
  export interface NextApiRequest {
    user?: admin.auth.DecodedIdToken;
    apicacheGroup?: string;
  }
}
