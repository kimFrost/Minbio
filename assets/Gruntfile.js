/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		banner: '',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			head: {
				src: ['js/libs/respond.js',
					'js/libs/namespaces.js',
					'js/libs/jquery-1.9.1.js',
					'js/libs/jquery.flexslider-min.js'],
				dest: '../scripts/head.js'
			},
			app: {
				src: ['js/Minbio.Bootstrap.js'
				],
				dest: '../scripts/Minbio.js'
			}
		},
		uglify: {
			head: {
				src: '<%= concat.head.dest %>',
				dest: '../scripts/head.min.js'
			},
			app: {
				src: '<%= concat.app.dest %>',
				dest: '../scripts/Minbio.min.js'
			}
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: '../css/',
				src: ['*.css', '!*.min.css', '!Icon*.css', '!RTE*.css'],
				dest: '../css/',
				ext: '.min.css'
			}
		},
		copy: {
			main: {
				files: [
					{ expand: true, cwd: 'img/', src: ['**', '!**/*.db', '!*.db'], dest: '../img/' },
					{ expand: true, cwd: 'fonts/', src: ['**'], dest: '../fonts/' },
					{ expand: true, cwd: 'icons/', src: ['*.svg', '*.eot', '*.woff', '*.ttf'], dest: '../fonts/' }
				]
			}
		},
		watch: {
			scripts: {
				files: ['<%= concat.app.src %>',
					'<%= concat.head.src %>'],
				tasks: ['concat']
			},
			images: {
				files: ['img/**',
					'img/**/*'],
				tasks: ['copy']
			},
			styles: {
				files: ['scss/**',
					'scss/**/*'
					],
				tasks: ['compass']
			},
			jade: {
				files: [
					"jade/*.jade"
				],
				tasks: "jade"
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: {
					"../index.html": ["jade/index.jade"],
                    "../index_brand_one_button.html": ["jade/branding_one_button/index.jade"],
					"../index_brand_two_buttons.html": ["jade/branding_two_buttons/index.jade"],
					"../index_no_branding.html": ["jade/no_branding/index.jade"]
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
	// Default task.
	grunt.registerTask('default', ['concat', 'uglify', 'copy', 'compass', 'cssmin', 'jade']);
	grunt.registerTask('dev', ['concat', 'copy', 'compass', 'jade', 'watch']);
};