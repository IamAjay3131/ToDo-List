import 'jquery';

declare module 'jquery' {
  interface JQueryStatic {
    notify(message: string, options?: string | object): void;
  }
}