module.exports= function(grunt){
    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'server.js',
                options:{
                   // watch: ['server.js']
                }
                }
            }
    });

    grunt.loadNpmTasks('grunt-nodemon');
}