export interface Tracer {
  executeFunctionWithinActiveSpan: <F extends () => Promise<ReturnType<F>>>(
    name: string,
    fn: F,
  ) => Promise<ReturnType<F>>;
  executeFunctionWithinInactiveSpan: <F extends () => Promise<ReturnType<F>>>(
    name: string,
    fn: F,
  ) => Promise<ReturnType<F>>;
}
