export default sideEffects => store => next => action => {
  next(action);
  sideEffects.forEach((sideEffectFn) => {
    sideEffectFn(action);
  });
}
