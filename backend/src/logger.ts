import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'ERROR' | 'WARN' | 'DEBUG';
  message: string;
  [key: string]: any;
}

class Logger {
  private logsDir: string;

  constructor(logsDir: string) {
    this.logsDir = logsDir;
  }

  private writeLog(logFile: string, entry: LogEntry): void {
    const stream = fs.createWriteStream(
      path.join(this.logsDir, logFile),
      { flags: 'a' }
    );
    stream.write(JSON.stringify(entry) + '\n');
    stream.end();
  }

  info(message: string, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      ...data,
    };
    console.log(`[INFO] ${message}`, data || '');
    this.writeLog('app.log', entry);
  }

  error(message: string, error?: any, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      ...data,
    };
    console.error(`[ERROR] ${message}`, error || '');
    this.writeLog('error.log', entry);
  }

  warn(message: string, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message,
      ...data,
    };
    console.warn(`[WARN] ${message}`, data || '');
    this.writeLog('app.log', entry);
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        message,
        ...data,
      };
      console.debug(`[DEBUG] ${message}`, data || '');
      this.writeLog('debug.log', entry);
    }
  }

  databaseOperation(method: string, table: string, status: 'SUCCESS' | 'FAILURE', details?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: status === 'SUCCESS' ? 'INFO' : 'ERROR',
      message: `Database ${method} on ${table}`,
      operation: method,
      table,
      status,
      ...details,
    };
    console.log(`[DB] ${method} ${table}: ${status}`, details || '');
    this.writeLog('database.log', entry);
  }

  getLogsDir(): string {
    return this.logsDir;
  }
}

export default new Logger(logsDir);
