function formatMessage(level, msg, meta = {}) {
  const base = {
    ts: new Date().toISOString(),
    level,
    message: msg,
    ...meta
  };
  return JSON.stringify(base);
}

module.exports = {
  info: (msg, meta) => console.log(formatMessage('info', msg, meta)),
  warn: (msg, meta) => console.warn(formatMessage('warn', msg, meta)),
  error: (msg, meta) => console.error(formatMessage('error', msg, meta)),
};
