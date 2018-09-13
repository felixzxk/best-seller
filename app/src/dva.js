// import { config } from "rx";

export function config() {
  return {
    onError(err) {
      err.preventDefault();
      console.error('----------', JSON.parse(err.message));
    },
  };
}
