var fs = require('fs');

var definition = (function() {
	framework.filestorage = function(name) {

		var key = 'filestorage-' + name;

		if (framework.databases[key])
			return framework.databases[key];

		var directory = framework.config.storage;
		if (directory[0] === '~')
			directory = utils.path(directory.substring(1)) + name + '/';
		else
			directory = framework.path.root(utils.path(framework.config.storage) + name + '/');

		if (!fs.exitsSync(directory))
			fs.mkdirSync(directory);

		framework.databases[key] = require('filestorage').create(directory);
		return framework.databases[key];
	};

	Controller.prototype.filestorage = function(name) {
		return this.framework.filestorage(name);
	};
});

setTimeout(function() {
	framework.eval(definition);
}, 100);