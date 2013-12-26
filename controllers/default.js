var stats = { upload: 0, read: 0, remove: 0 };
var names = {};

exports.install = function(framework) {
	framework.route('/', plain_homepage);
	framework.route('/availability/', json_availability);
	framework.route('/{name}/', upload_files, ['put', 'upload'], (1024 * 1024) * 20); // 20 MB
	framework.route('/{name}/{id}/', read_file);
	framework.route('/{name}/{id}/', remove_file, ['delete']);
	framework.route('/{name}/info/{id}/', json_file_info);
	framework.route('/{name}/listing/', json_listing);
	framework.route('/{name}/count/', json_count);
};

function plain_homepage() {
	var self = this;
	var builder = [];

	builder.push('Pending requests          : ' + self.framework.stats.request.pending);
	builder.push('Uploaded files            : ' + stats.upload);
	builder.push('Read files                : ' + stats.read);
	builder.push('Removed files             : ' + stats.remove);

	builder.push('');
	builder.push('Requests')
	builder.push('========');
	builder.push('');

	Object.keys(names).forEach(function(key) {
		builder.push('#' + key.padRight(25) + ': ' + names[key]);
	});

	self.plain(self.config.name + ' v' + self.config.version + '\n================\n\n' + builder.join('\n'));
}

function upload_files(name) {

	var self = this;
	var length = self.files.length;
	var storage = self.filestorage(name || 'default');
	var result = {};

	names[name] = (names[name] || 0) + 1;

	for (var i = 0; i < length; i++) {
		var file = self.files[i];
		result[file.name] = { id: storage.insert(file.filename, file.path), filename: file.filename, length: file.length, width: file.width, height: file.height, contentType: file.contentType };
		stats.upload++;
	}

	self.json(result);
}

function read_file(name, id) {
	var self = this;
	names[name] = (names[name] || 0) + 1;
	self.custom();
	stats.read++;
	self.filestorage(name).pipe(id.parseInt(), self.req, self.res, true);
}

function remove_file(name, id) {
	var self = this;
	var arr = id.split('-');

	names[name] = (names[name] || 0) + 1;

	if (arr.length === 1) {
		stats.remove++;
		self.filestorage(name).remove(id.parseInt());
		self.json({ success: true });
		return;
	}

	arr.waiting(function(id, next) {
		stats.remove++;
		self.filestorage(name).remove(id.parseInt(), next);
	});

	self.json({ success: true });
}

function json_listing(name) {

	var self = this;

	names[name] = (names[name] || 0) + 1;

	self.filestorage(name).listing(function(err, arr) {

		if (err) {
			self.view500(err);
			return;
		}

		self.plain(arr);
	});
}

function json_availability() {
	var self= this;
	self.json({ available: true });
}

function json_count(name) {
	var self = this;
	names[name] = (names[name] || 0) + 1;
	self.json(self.filestorage(name).options);
}

function json_file_info(name, id) {
	var self = this;
	names[name] = (names[name] || 0) + 1;
	self.filestorage(name).stat(id, function(err, header) {

		if (err) {
			self.view500(err);
			return;
		}

		self.json(header);
	});
}