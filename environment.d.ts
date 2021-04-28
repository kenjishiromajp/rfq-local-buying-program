declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      API_URL: string;
      NODE_ENV: 'development' | 'production';
      DATABASE_CONNECTION_STRING: string;
    }
  }

  interface Window {
    dataLayer?: any[];
    opera?: any;

    ga?(
      send: string,
      event: string,
      category: string,
      action: string,
      label: string,
      value: string,
    ): any;

    gtag?(event: string, action: string, options: any): any;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
