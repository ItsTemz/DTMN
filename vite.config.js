import { createConfig } from "vite";

export default createConfig({
  entry: "public/index.html",
  jsx: {
    factory: "React.createElement",
    fragment: "React.Fragment",
  },
});
