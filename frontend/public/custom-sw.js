self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('New notification', data)
    const options = {
      body: data.body,
    }
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  })

  self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();
  
    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow('/');
    }));
  });