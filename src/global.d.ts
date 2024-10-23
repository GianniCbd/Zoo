export {};

declare global {
  interface Window {
    botpress: {
      on: (event: string, callback: (data: any) => void) => void;
      sendEvent: (event: { type: string; payload?: any }) => void;
      // Add other methods here if needed
    };
  }
}
