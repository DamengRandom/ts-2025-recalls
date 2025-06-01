// 定义通用的 Alert 接口
interface Alert<T> {
  timestamp: string;
  data: T;
  type: string;
  id: string;
  name: string;
}

// 定义具体的警报类型
interface CancelledAlertData {
  // CancelledAlert 特有的数据结构
  reason: string;
}

interface LimitedAlertData {
  // LimitedAlert 特有的数据结构
  limit: number;
  currentGap: number;
}

// 实现具体的警报类型
type CancelledAlert = Alert<CancelledAlertData>;
type LimitedAlert = Alert<LimitedAlertData>;

// 如果将来需要添加新的警报类型，只需定义新的数据结构
interface SkippedAlertData {
  // FeedAlert 特有的数据结构
  skippedSource: string;
  skippedContent: string;
}

type FeedAlert = Alert<SkippedAlertData>;

// 使用示例
const cancelledAlert: CancelledAlert = {
  timestamp: "2023-10-01T10:00:00Z",
  data: { reason: "Weather conditions" },
  type: "Cancelled",
  id: "alert-001",
  name: "Cancelled Alert"
};

const limitedAlert: LimitedAlert = {
  timestamp: "2023-10-01T11:00:00Z",
  data: { limit: 10000, currentGap: 9500 },
  type: "Limited",
  id: "alert-002",
  name: "LimitedAlert"
};

const skippedAlert: FeedAlert = {
  timestamp: "2023-10-01T12:00:00Z",
  data: { skippedSource: "RSS", skippedContent: "New skipped content" },
  type: "Skipped",
  id: "alert-003",
  name: "Skipped Alert"
};
