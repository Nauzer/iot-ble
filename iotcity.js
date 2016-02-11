var DEVICE_ID = 'F0:22:8C:55:F5:D3';

var redbear = {
  serviceUUID: "713D0000-503E-4C75-BA94-3148F18D941E",
  txCharacteristic: "713D0003-503E-4C75-BA94-3148F18D941E", // transmit is from the phone's perspective
  rxCharacteristic: "713D0002-503E-4C75-BA94-3148F18D941E"  // receive is from the phone's perspective
};

if(Meteor.isClient) {

    Session.setDefault("connected", false);

    ble.isEnabled(function() {
        Session.set("enabled", true);
    }, function() {
        Session.set("enabled", false);
    });

    Template.hello.events({
        'click #connect': function(event, template) {
            event.preventDefault();
            ble.scan([], 5,
            function(peripherals){
                connectDevice(DEVICE_ID);
            },
            function(){
                console.log('No devices found');
            });
        }
    });

    Template.hello.helpers({
        connected : function(value) {
            return Session.get("connected") === value;
        },
        enabled: function() {
            return Session.get("enabled");
        }
    });
}

var connectDevice = function (device_id) {
  console.log("here");
  ble.connect(device_id,

      function(device){
          Session.set('connected',true);
      },
      function(){
          Session.set('connected',false);
      });
};