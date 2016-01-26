module.exports = functionm(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sasslint: {
            options: {
                configFile: 'config/.sass-lint.yml',
            },
            target: ['app/assets/sass/*.scss', 'app/mobile/sass/*.scss']
        },
        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: true,
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'The Content-Type was “text/html”. Using the HTML parser.',
                    'Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support.',
                    'Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections.'],
                generateReport: false
            },
            files: {
                src: ['app/assets/*.html']
            }
        }

    });

    [
        'grunt-sass',
        'grunt-sass-lint',
        'grunt-w3c-html-validation'
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });


    grunt.registerTask('default',
        [
            'validation',
            'sasslint'
        ]);

};