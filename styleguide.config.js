const path = require('path');

module.exports = {
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/styleguide/Wrapper')
    },
    template: {
        favicon: 'https://panikrwinka.pl/sumator/images/favicon.png',
        head: {
            links: [
                {href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap', rel: 'stylesheet'},
                {href:'https://fonts.gstatic.com', rel: 'preconnect'}
            ],
            scripts: [{src: 'https://kit.fontawesome.com/b282f36c60.js', crossorigin: 'anonymous'}]
        }
    },
    components: 'src/components/**/*.js',
    ignore: ['src/components/**/*.styles.js','src/components/**/*.test.js']
};