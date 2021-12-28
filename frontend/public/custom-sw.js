self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('New notification', data)
    const options = {
      body: data.body,
      data:data.data,
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
    }
    // This looks to see if the current is already open and
    // focuses if it is

  });