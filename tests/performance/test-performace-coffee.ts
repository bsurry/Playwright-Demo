// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from 'k6/http';

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const res = http.get('https://coffee-cart.app/list.json');
  check(res, { 
    'status is 200': (r) => r.status === 200,
    'response time is less than 160ms': (r) => r.timings.duration < 160,
});
  sleep(1); // Sleep for 1 second between requests
}