export default sideEffects => store => next => action => {
  sideEffects.forEach((sideEffectFn) => {
    sideEffectFn(action);
  });
  next(action);
}
