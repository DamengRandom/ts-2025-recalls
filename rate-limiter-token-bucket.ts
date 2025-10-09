class TokenBucketRateLimiter {
  private capacity: number;
  private refillRate: number;
  private tokensAmount: Map<string, number>;
  private lastRefill: Map<string, number>;

  constructor(capacity: number, refillRatePerSecond: number) {
    this.capacity = capacity;
    this.refillRate = refillRatePerSecond;
    this.tokensAmount = new Map();
    this.lastRefill = new Map();
  }

  private refill(key: string) {
    const now = Date.now();
    const last = this.lastRefill.get(key) || now;
    const elapsedSeconds = (now - last) / 1000;
    const tokensToAdd = elapsedSeconds * this.refillRate;
    const currentTokensAmount = Math.min(this.capacity, (this.tokensAmount.get(key) || this.capacity) + tokensToAdd);

    this.tokensAmount.set(key, currentTokensAmount);
    this.lastRefill.set(key, now);
  };

  allowRequest(key: string): boolean {
    this.refill(key);

    const availableTokensAmount = this.tokensAmount.get(key) || 0;

    if (availableTokensAmount < 1) return false;

    this.tokensAmount.set(key, availableTokensAmount - 1);

    return true;
  };

  resetLimiter() {
    this.tokensAmount.clear();
    this.lastRefill.clear();
  }
}

function caller(key: string) {
  const limiter = new TokenBucketRateLimiter(3, 1); // capacity: 5, refillRate: 1 per second
  
  limiter.resetLimiter();

  setInterval(() => {
    const isAllowed = limiter.allowRequest(key);
    console.log(`Request ${new Date().toISOString()}: ${isAllowed ? "allowed" : "denied"}`);
  }, 300);
}

caller("user1");
