/**
 * Instance Manager — rotates through Monochrome API/streaming instances
 * by health-checking them on startup and marking failures at runtime.
 */

const API_INSTANCES = [
  'https://hifi-one.spotisaver.net',
  'https://hifi-two.spotisaver.net',
  'https://ohio-1.monochrome.tf',
  'https://singapore-1.monochrome.tf',
  'https://frankfurt-1.monochrome.tf',
  'https://hifi.geeked.wtf',
  'https://eu-central.monochrome.tf',
  'https://us-west.monochrome.tf',
  'https://triton.squid.wtf',
  'https://arran.monochrome.tf',
  'https://api.monochrome.tf',
  'https://monochrome-api.samidy.com',
  'https://tidal.kinoplus.online',
];

const STREAM_INSTANCES = [
  'https://hifi-one.spotisaver.net',
  'https://hifi-two.spotisaver.net',
  'https://ohio-1.monochrome.tf',
  'https://singapore-1.monochrome.tf',
  'https://frankfurt-1.monochrome.tf',
  'https://hifi.geeked.wtf',
  'https://triton.squid.wtf',
  'https://api.monochrome.tf',
];

class InstanceManager {
  constructor() {
    this._apiInstances = [...API_INSTANCES];
    this._streamInstances = [...STREAM_INSTANCES];
    this._failedApis = new Set();
    this._failedStreams = new Set();
    this._rankedApis = [...API_INSTANCES];
    this._rankedStreams = [...STREAM_INSTANCES];
    this._initialized = false;
  }

  async initialize() {
    if (this._initialized) return;
    this._initialized = true;
    // Try to rank by latency in the background – don't block startup
    this._rankInstances().catch(() => {});
  }

  async _pingInstance(url, timeoutMs = 4000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    const start = performance.now();
    try {
      await fetch(`${url}/search/?s=test&limit=1`, {
        signal: controller.signal,
        mode: 'cors',
      });
      clearTimeout(id);
      return performance.now() - start;
    } catch {
      clearTimeout(id);
      return Infinity;
    }
  }

  async _rankInstances() {
    const results = await Promise.all(
      this._apiInstances.map(async (url) => ({
        url,
        latency: await this._pingInstance(url),
      }))
    );
    this._rankedApis = results
      .sort((a, b) => a.latency - b.latency)
      .map((r) => r.url);

    // For streaming instances, reuse the api ranking order where applicable
    this._rankedStreams = this._streamInstances.sort((a, b) => {
      const la = results.find((r) => r.url === a)?.latency ?? Infinity;
      const lb = results.find((r) => r.url === b)?.latency ?? Infinity;
      return la - lb;
    });
  }

  getBestApiInstance() {
    const available = this._rankedApis.filter(
      (u) => !this._failedApis.has(u)
    );
    return available[0] ?? this._rankedApis[0];
  }

  getBestStreamInstance() {
    const available = this._rankedStreams.filter(
      (u) => !this._failedStreams.has(u)
    );
    return available[0] ?? this._rankedStreams[0];
  }

  getApiInstances() {
    return this._rankedApis.filter((u) => !this._failedApis.has(u));
  }

  getStreamInstances() {
    return this._rankedStreams.filter((u) => !this._failedStreams.has(u));
  }

  markApiFailed(url) {
    this._failedApis.add(url);
    console.warn(`[InstanceManager] Marked API instance as failed: ${url}`);
  }

  markStreamFailed(url) {
    this._failedStreams.add(url);
    console.warn(`[InstanceManager] Marked stream instance as failed: ${url}`);
  }

  // Reset failures (e.g. on reconnect)
  resetFailures() {
    this._failedApis.clear();
    this._failedStreams.clear();
  }

  getAllApiInstances() {
    return [...this._apiInstances];
  }
}

export const instanceManager = new InstanceManager();
