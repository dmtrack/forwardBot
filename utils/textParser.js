export const textParser = function (text: string) {
  const array = text.split("");
  const index = array.findIndex((el) => {
    return el === "/";
  });
  return {
    id: +text.slice(0, index),
    message: text.slice(index + 1, text.length),
  };
};
