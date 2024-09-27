export {};

declare global {
  interface Window {
    ic: any;
    // ic: {
    //   plug: {
    //     isConnected: () => Promise<boolean>;
    //     requestConnect: () => Promise<string>;
    //     requestBalance: () => Promise<any>;
    //   };
    // };
  }
}
