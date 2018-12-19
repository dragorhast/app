export default function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
}
