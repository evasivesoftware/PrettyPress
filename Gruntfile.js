module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: {
        files: {
            src: 'assets/js/src/*.js',  // source files mask
            dest: 'assets/js/build/',    // destination folder
            expand: true,    // allow dynamic building
            flatten: true,   // remove all unnecessary nesting
            ext: '.min.js',   // replace .js to .min.js
            options: {
                preserveComments: 'some'
            }
        }
    },
    concat: {
        dist: {
            src: ['assets/js/build/base64.min.js', 'assets/js/build/marked.min.js', 'assets/js/build/to-markdown.min.js', 'assets/js/build/beautify-html.min.js', 'assets/js/build/prettypress-free.min.js', 'assets/js/build/prettypress-layout.min.js'],
            dest: 'assets/js/prettypress-free.min.js',
        }
    },
    watch: {
        js:  { files: ['assets/js/src/*.js'], tasks: [ 'uglify', 'concat', 'base64'] },
        css:  { files: ['assets/css/*.css'], tasks: [ 'autoprefixer' ] },
    },
    autoprefixer: {
        options: {
            browsers: ['last 50 versions', 'ie 6', 'ie 7', 'ie 8', 'ie 9']
        },
        dist: {
            files: {
                'assets/css/prettypress.css': 'assets/css/prettypress-noprefix.css'
            }
        }
    }
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-autoprefixer');

// register at least this one task
grunt.registerTask('default', [ 'uglify', 'concat', 'autoprefixer' ]);



};
