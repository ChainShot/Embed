export default () => {
  const { search } = window.location;
  return (search || "").slice(1).split("&").reduce((obj, pair) => {
    const [key, value] = pair.split("=");
    return {
      [key]: value,
      ...obj,
    }
  }, {})
}
