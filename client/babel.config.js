// // export const presets = [
//   '@babel/preset-env',
//   '@babel/preset-react',
// ];


module.exports = {
  presets: [
    '@babel/preset-env', // Transpiles modern JavaScript (ES6+)
    '@babel/preset-react', // Handles React's JSX syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // Optional: helps with async/await and other features
  ],
};
