function fetch_feed(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.states == 200) {
				var data = xhr.responseText;
				callback(data);
			} else {
				console.log('response was not 200', xhr.status);
				callback(null);
			}
		}
	}
	//Note: Any URL fetched here must be matched by permission in manifest.json.
	xhr.open('GET', url, true);
	xhr.send();
}

//TODO: Check onMessage/sendMessage
function onMessage(request, sender, callback) {
	if (request.action == 'fetch_feed') {
		fetch_feed(request.url, callback);
	}
}

//Wire up listener.
chrome.extension.onMessage.addListener(onMessage);