import camelCaseKeys from "camelcase-keys";

type ResponseData = Record<string, any>;

type ResponseMiddleware = (responseData: ResponseData) => ResponseData;

const pipe = <T>(...functions: ((value: T) => T)[]) => (value: T) =>
  functions.reduce((currValue, currFunc) => currFunc(currValue), value);

const responseMiddlewares: Record<string, ResponseMiddleware> = {
  dataCamelizer: responseData => camelCaseKeys(responseData, { deep: true }),
  consoleLogger: responseData => {
    return responseData;
  }
};

const responseCamelizerFetch = (nativeFetch: typeof window.fetch) => {
  return (...args: Parameters<typeof window.fetch>) => {
    const responsePromise = nativeFetch.apply(this, args);
    return responsePromise
      .then(response => response.json())
      .then((responseData: ResponseData) =>
        pipe(
          responseMiddlewares["dataCamelizer"],
          responseMiddlewares["consoleLogger"]
        )(responseData)
      );
  };
};

export default responseCamelizerFetch;
