if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('serviceWorker registrated');
    }).catch(() => {
        console.log('serviceWorker not registrated');
    });
}