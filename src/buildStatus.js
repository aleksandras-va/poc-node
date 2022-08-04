const buildStatus = (message, previousStatus) => {
  const formattedMessage = `<pre>${message}</pre>`;
  return previousStatus ? previousStatus + formattedMessage : formattedMessage;
};

export { buildStatus };
