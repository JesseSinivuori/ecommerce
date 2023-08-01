const releaseConfig = {
  branches: ["master", "main"],
  plugins: [
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "dist/asset.min.css", label: "CSS distribution" },
          { path: "dist/asset.min.js", label: "JS distribution" },
        ],
      },
    ],
  ],
};

export default releaseConfig;
