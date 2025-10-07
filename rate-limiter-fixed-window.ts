class FixedWindowRateLimiter {
  private windowSizeInMs: number;
  private maxRequests: number;
  private windows: Map<string, { count: number; windowStarted: number }>;

  constructor(maxRequests: number, windowSizeInSeconds: number) {
    this.maxRequests = maxRequests;
    this.windowSizeInMs = windowSizeInSeconds * 1000;
    this.windows = new Map();
  }

  allowRequest(key: string): boolean {
    const now = Date.now();
    const windowStarted = (now / this.windowSizeInMs) * this.windowSizeInMs;
    const record = this.windows.get(key);

    if (record && record.windowStarted === windowStarted) {
      if (record.count >= this.maxRequests) {
        return false;
      }

      record.count++;
      this.windows.set(key, record);
    } else {
      this.windows.set(key, { count: 1, windowStarted });
    }

    return true;
  }

  clearWindows() {
    this.windows.clear();
  }
}

function caller() {
  const limiter = new FixedWindowRateLimiter(3, 1);
  const mockUserKey = "User5566";
  
  limiter.clearWindows();

  for (let i = 0; i < 5; i++) {
    const isAllowed = limiter.allowRequest(mockUserKey);

    console.log(`Request ${i + 1} by ${mockUserKey}: ${isAllowed ? "Alloed" : "Rate limited .."}`);
  }
}

caller();
