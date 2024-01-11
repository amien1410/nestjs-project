module.exports = (config, _context) => {
  // Find the ts-loader rule in the Webpack configuration
  const tsLoader = config.module.rules.find((rule) =>
    rule.loader.includes("ts-loader")
  );

  if (tsLoader) {
    // Enable transpileOnly for ts-loader
    tsLoader.options.transpileOnly = false;

    // Configure custom transformers for TypeScript
    tsLoader.options.getCustomTransformers = (program) => {
      return {
        before: [
          // Apply @nestjs/graphql/plugin before TypeScript compilation
          require("@nestjs/graphql/plugin").before(
            {
              "typeFileNameSuffix": [".input.ts", ".dto.ts"]
            },
            program
          ),
        ],
      };
    };
  }

  // Return the modified configuration
  return config;
};
