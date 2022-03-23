module.exports = {
  "stories": ["../src/**/**/*.stories.@(ts|md)x"],
  "addons": ["@storybook/addon-knobs", "@storybook/addon-links", "@storybook/addon-essentials", "@storybook/preset-create-react-app"],
  "framework": "@storybook/react",
  core: {
    builder: "webpack5"
  }
};
