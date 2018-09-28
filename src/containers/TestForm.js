import { Analytics } from 'aws-amplify';

Analytics.configure({
  // OPTIONAL - disable Analytics if true
  disabled: false,
  // OPTIONAL - Allow recording session events. Default is true.
  autoSessionRecord: true,

  AWSPinpoint: {
    // OPTIONAL -  Amazon Pinpoint App Client ID
    appId: 'XXXXXXXXXXabcdefghij1234567890ab',
    // OPTIONAL -  Amazon service region
    region: 'XX-XXXX-X',
    // OPTIONAL -  Customized endpoint
    endpointId: 'XXXXXXXXXXXX',
    // OPTIONAL - client context
    clientContext: {
      clientId: 'xxxxx',
      appTitle: 'xxxxx',
      appVersionName: 'xxxxx',
      appVersionCode: 'xxxxx',
      appPackageName: 'xxxxx',
      platform: 'xxxxx',
      platformVersion: 'xxxxx',
      model: 'xxxxx',
      make: 'xxxxx',
      locale: 'xxxxx'
    },

    // Buffer settings used for reporting analytics events.

    // OPTIONAL - The buffer size for events in number of items.
    bufferSize: 1000,

    // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
    flushInterval: 5000, // 5s 

    // OPTIONAL - The number of events to be deleted from the buffer when flushed.
    flushSize: 100,

    // OPTIONAL - The limit for failed recording retries.
    resendLimit: 5
  } 
});

