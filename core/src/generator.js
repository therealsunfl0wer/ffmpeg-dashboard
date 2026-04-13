async function* createFileGenerator(process) {
  for await (const chunk of process.stderr) {
    const lines = chunk.toString().split("\n");
    for (const line of lines) {
      if (line.trim()) yield line;
    }
  }
}

//checking if the process hangs
async function createTimeoutIterator(iterator, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  for await (const value of iterator) {
    if (Date.now() > deadline) break;
    console.log(value);
  }
}

export { createFileGenerator, createTimeoutIterator };
