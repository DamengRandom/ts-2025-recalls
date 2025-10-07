class LeadyBucketRateLimiter {
  private capacity: number;
  private leakRate: number;
  private buckets: Map<string, number>;
  private lastLeakTime: Map<string, number>;

  constructor(capacity: number, leakRatePerSecond: number) {
    this.capacity = capacity;
    this.leakRate = leakRatePerSecond;
    this.buckets = new Map();
    this.lastLeakTime= new Map();
  }

  private leak(key: string) {
    const now = Date.now();
    const last = this.lastLeakTime.get(key) || now;
    const elapsedSeconds = (now - last) / 1000;

    const leaked = elapsedSeconds * this.leakRate;
    const current = this.buckets.get(key) || 0;

    // calculate remaining water (requests) after leaking
    const newLevel = Math.max(0, current - leaked);

    this.buckets.set(key, newLevel);
    this.lastLeakTime.set(key, now);
  }

  allowRequest(key: string): boolean {
    this.leak(key);

    const current = this.buckets.get(key) || 0;

    if (current >= this.capacity) {
      return false;
    }

    this.buckets.set(key, current + 1);

    return true;
  }
}

function caller() {
  const limiter = new LeadyBucketRateLimiter(10, 2); // capacity = 10, leak = 2 per second
  const userKey = "user7381";

  setInterval(() => {
    const isAllowed = limiter.allowRequest(userKey);

    console.log(`Request on ${new Date().toISOString()}: ${isAllowed ? "Allowed" : "Rate limited .."}`);
  }, 300);
}

caller();
