module.exports = readLines;

function readLines(stream, callback) {
	var prevChunks = [];
	var hasPrevChunks = false;
	stream.on('readable', function() {
		var chunk = stream.read();
		var fromIndex = 0;
		var newLineIndex;
		while ((newLineIndex = chunk.indexOf('\n', fromIndex)) != -1) {
			var line;
			if (hasPrevChunks) {
				line = prevChunks.join('') + chunk.substring(fromIndex, newLineIndex);
				prevChunks = [];
				hasPrevChunks = false;
			} else {
				line = chunk.substring(fromIndex, newLineIndex);
			}
			fromIndex = newLineIndex + 1;
			callback(line);
		}
		prevChunks.push(chunk.substring(fromIndex));
		hasPrevChunks = true;
	});
}