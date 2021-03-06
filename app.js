var mqtt = require('mqtt')
var CONFIG = require('./config.json');

var credentials = {
  username: CONFIG.DEVICE_ID,
  password: CONFIG.DEVICE_TOKEN
}

var client  = mqtt.connect('mqtts://api.artik.cloud', credentials);

// ARTIK Cloud only allows the following 2 paths on MQTT
var PUBLISH_MESSAGE_PATH = "/v1.1/messages/" + CONFIG.DEVICE_ID;
var SUBSCRIBE_ACTION_PATH = "/v1.1/actions/" + CONFIG.DEVICE_ID;


client.on('connect', function () {

 
  var sampleData = getSampleData();
  console.log("publishing data:", sampleData)
  console.log("publish path:", PUBLISH_MESSAGE_PATH);

  client.subscribe(SUBSCRIBE_ACTION_PATH);
  client.publish(PUBLISH_MESSAGE_PATH, getSampleData());

  console.log("Use browser to see your data in realtime https://artik.cloud/my/data")

})

client.on('message', function (topic, message) {
  console.log(message.toString())
  client.end()
})

//
function getSampleData() {

	//fields key/value for you ARTIK Cloud device
	return JSON.stringify({
	  "temp": 214
	})

}


