const path = require('path');

module.exports = {
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
    },
    components: 'src/components/**/*.js',
    ignore: ['src/components/**/*.styles.js','src/components/**/*.test.js']
};