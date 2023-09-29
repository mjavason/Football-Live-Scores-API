const subscribeButton = document.getElementById('subscribe');
const siteLink = 'http://127.0.0.1:5000';
const publicVapidKey =
  'BMpGGyg4FMXS93mdBJ1kx_Wt7lwfAo_D9qaRKsDNV9rKaYI82gRz3JzFwhkE1ZbUN4Uci2mRNj_tr-OZcTA8K4Y';

subscribeButton.addEventListener('click', () => {
  if ('serviceWorker' in navigator) {
    registerServiceWorker();
  } else {
    console.log('Service worker not supported');
  }
});

async function registerServiceWorker() {
  try {
    const existingSubscription = await navigator.serviceWorker.ready.then((swRegistration) =>
      swRegistration.pushManager.getSubscription(),
    );

    if (existingSubscription) {
      console.log('User is already subscribed:', existingSubscription);
      return;
    }

    const register = await navigator.serviceWorker.register('./worker.js', {
      scope: '',
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey,
    });

    console.log(subscription);

    await fetch(`${siteLink}/api/v1/notification/subscribe`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.log(e);
  }
}
