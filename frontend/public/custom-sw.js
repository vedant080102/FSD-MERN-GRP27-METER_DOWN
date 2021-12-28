self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('New notification', data)
    dataObj={"type":data.type}
    if(data.ride!=null && data.ride!=undefined){
      dataObj.rideid=data.ride
    }
    const options = {
      body: data.body,
      data:dataObj,
      icon:"../src/Media/logo.png"
    }
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  })

  self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event);
    event.notification.close();
    var notifType=event.notification.data.type
    if(notifType=="home"){
      event.waitUntil(clients.matchAll({
        type: "window"
      }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == '/' && 'focus' in client){
            console.log("inside focus")
            client.navigate('/');
            return client.focus();
          }
       return   client.navigate('/');
        }
        if (clients.openWindow)
          return clients.openWindow('/');
      }));
    }else if(notifType=="passengerAllot"){
      event.waitUntil(clients.matchAll({
        type: "window"
      }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == '/ride/summary' && 'focus' in client)
            return client.focus();
        }
        if (clients.openWindow)
          return clients.openWindow('/ride/summary');
      }));
    }else if(notifType=="review"){
      event.waitUntil(clients.matchAll({
        type: "window"
      }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == '/review/'+event.notification.data.rideid && 'focus' in client)
            return client.focus();
        }
        if (clients.openWindow)
          return clients.openWindow('/review/'+event.notification.data.rideid);
      }));
    }
    // This looks to see if the current is already open and
    // focuses if it is

  });