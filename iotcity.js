var DEVICE_ID = 'F0:22:8C:55:F5:D3';

var redbear = {
  serviceUUID: "713D0000-503E-4C75-BA94-3148F18D941E",
  txCharacteristic: "713D0003-503E-4C75-BA94-3148F18D941E", // transmit is from the phone's perspective
  rxCharacteristic: "713D0002-503E-4C75-BA94-3148F18D941E"  // receive is from the phone's perspective
};

if(Meteor.isClient) {
  Session.setDefault("connected", false);
  /*
  Template.hello.events({
    'click #connect': function(event, template) {
      event.preventDefault();
      if (Meteor.isCordova) {
        Meteor.startup(function () {

          ble.scan([], 5,
              function(peripherals){
                connectDevice(DEVICE_ID);
              },
              function(){
                console.log('No devices found');
              }
          );
        });
      }
    },
    'click #data' :function(event, template) {
      event.preventDefault();
      if (Meteor.isCordova) {
        Meteor.startup(function () {

          data = "PENBUj0xPg==";

          ble.writeWithoutResponse(DEVICE_ID, redbear.serviceUUID, redbear.txCharacteristic, data, function() {
            Session.set("counter", "Successful data transmission");
          }, function(error) {
            console.log(error);
            Session.set("counter", "Failed data transmission");
          });
        });
      }
    }
  });
  */

  Template.hello.helpers({
    connected : function(value) {
      return Session.get("connected") === value;
    }
  })
};



var connectDevice = function (device_id) {
  console.log("here");
  ble.connect(device_id,
      function(device){
        Session.set('counter',"Connected to "+device.name);
      },
      function(){
        Session.set('counter', "Failed to connect to "+ device_id);
      });
};