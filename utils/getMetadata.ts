const getMetadata = (msg: any) => {
  try {
    return typeof msg.metadata === "string"
      ? JSON.parse(msg.metadata)
      : msg.metadata;
  } catch (e) {
    return null;
  }
};
