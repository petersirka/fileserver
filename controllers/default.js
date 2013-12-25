exports.install = function(framework) {
	framework.route('/', plain_homepage);
	framework.route('/{name}/', upload_files, ['put', 'upload'], (1024 * 1024) * 20); // 20 MB
	framework.route('/{name}/{id}/', read_file);
	framework.route('/{name}/{id}/', remove_file, ['delete']);
	framework.route('/{name}/info/{id}/', json_file_info);
	framework.route('/{name}/listing/', json_listing);
	framework.route('/{name}/count/', json_count);	
};

function plain_homepage() {
	var self = this;
	self.plain(self.config.name + ' v' + self.config.version);
}

function upload_files(name) {

	var self = this;
	var length = self.files.length;
	var storage = self.filestorage(name || 'default');
	var result = {};

	for (var i = 0; i < length; i++) {
		var file = self.files[i];
		result[file.name] = { id: storage.insert(file.filename, file.path), filename: file.filename };
	}

	self.json(result);
}

function read_file(name, id) {
	var self = this;
	self.custom();
	self.filestorage(name).pipe(id.parseInt(), self.req, self.res, true);
}

function remove_file(name, id) {
	var self = this;

	var arr = id.split('-');

	if (arr.length === 1) {
		self.filestorage(name).remove(id.parseInt());
		self.json({ success: true });
		return;
	}

	arr.waiting(function(id, next) {
		self.filestorage(name).remove(id.parseInt(), next);
	});

	self.json({ success: true });
}

function json_listing(name) {

	var self = this;
	self.filestorage(name).listing(function(err, arr) {

		if (err) {
			self.view500(err);
			return;
		}

		self.plain(arr);
	});
}

function json_count(name) {
	var self = this;
	self.json(self.filestorage(name).options);
}

function json_file_info(name, id) {
	var self = this;
	self.filestorage(name).stat(id, function(err, header) {

		if (err) {
			self.view500(err);
			return;
		}

		self.json(header);
	});
}