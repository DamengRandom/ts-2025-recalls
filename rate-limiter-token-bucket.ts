class TokenBucketRateLimiter {
  private capacity: number; // max number of tokens in the bucket
  private refillRate: number; // tokens added per second
  private tokens: Map<string, number>;
  private lastRefill: Map<string, number>;

  constructor(capacity: number, refillRatePerSecond: number) {
    this.capacity = capacity;
    this.refillRate = refillRatePerSecond;
    this.tokens = new Map();
    this.lastRefill = new Map();
  }

  private refill(key: string) {
    const now = Date.now();
    const last = this.lastRefill.get(key) || now;
    const elapsedSeconds = (now - last) / 1000;
    const tokensToAdd = elapsedSeconds * this.refillRate;
    const currentTokens = Math.min(this.capacity, (this.tokens.get(key) || this.capacity) + tokensToAdd);

    this.tokens.set(key, currentTokens);
    this.lastRefill.set(key, now);
  }

  allowRequest(key: string): boolean {
    this.refill(key);

    const availableTokens = this.tokens.get(key) || 0;

    if (availableTokens < 1) {
      return false;
    }

    this.tokens.set(key, availableTokens - 1);

    return true;
  };
}

function caller() {
  const limiter = new TokenBucketRateLimiter(5, 1); // capacity = 5 (max 5 tokens in the bucket), refill = 1 token / per sec
  const userKey = "user456";

  setInterval(() => {
    const allowedRequests = limiter.allowRequest(userKey);
    console.log(`Request: ${allowedRequests ? 'Allowed' : 'Rate Limited'}`);
  }, 300);
};

caller();