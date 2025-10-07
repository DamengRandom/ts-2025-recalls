class SlidingWindowRateLimiter {
  private windowSizeInMs: number;
  private maxRequests: number;
  private requests: Map<string, number[]>;

  constructor(maxRequests: number, windowSizeInSeconds: number) {
    this.maxRequests = maxRequests;
    this.windowSizeInMs = windowSizeInSeconds * 1000;
    this.requests = new Map();
  }

  allowRequest(key: string): boolean {
    const now = Date.now();
    const windowStarted = now - this.windowSizeInMs;
    // Get timestamps for this key or start fresh
    const timestampsByKey = this.requests.get(key) || [];
    // Remove timestamps outside the current window
    const recentTimestamps = timestampsByKey.filter(ts => ts > windowStarted);
    // clean up the old timestamps values which are outside of the sliding window
    while (timestampsByKey.length && timestampsByKey[0] <= windowStarted) {
      timestampsByKey.shift();
    }
    // too many requests -> reject (rate limiting now)
    if (recentTimestamps.length >= this.maxRequests) {
      return false;
    }
    // Allow -> record the new request
    recentTimestamps.push(now);
    // update the timestamps for this key
    this.requests.set(key, recentTimestamps);
    // return true to allow the request
    return true;
  }

  clearRequestsByKey(key: string) {
    this.requests.delete(key);
  }
}

// How to use it, in another middleware.js file
function caller() {
  const limiter = new SlidingWindowRateLimiter(3, 1); // 3 requests per 1 second
  const userKey = "user123";
  // clear the requests for this key
  limiter.clearRequestsByKey(userKey);

  for (let i = 0; i < 5; i++) {
    const allowed = limiter.allowRequest(userKey);
    console.log(`Request ${i + 1}: ${allowed ? 'Allowed' : 'Rate Limited'}`);
    // Results will be:
    // Request 1: Allowed
    // Request 2: Allowed
    // Request 3: Allowed
    // Request 4: Rate Limited
    // Request 5: Rate Limited
  }
}

caller();
