// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as next from 'next';

declare module 'next' {
  export interface NextApiRequest {
    user?: admin.auth.DecodedIdToken;
    apicacheGroup?: string;
  }
}
