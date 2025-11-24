export const getSender = (loggedUser, users) => {
  console.log("[getSender] Logged User:", loggedUser);
  console.log("[getSender] Users:", users);

  if (
    !loggedUser ||
    !Array.isArray(users) ||
    users.length < 2 ||
    !users[0] ||
    !users[1]
  ) {
    console.log("[getSender] Invalid input, returning fallback");
    return "Unknown User";
  }

  const otherUser = users[0]._id === loggedUser._id ? users[1] : users[0];
  console.log("[getSender] Other User:", otherUser);

  const senderName =
    otherUser.name || otherUser.username || otherUser._id || "Unknown User";
  console.log("[getSender] Sender Name:", senderName);

  return senderName;
};

export const getSenderFull = (loggedUser, users) => {
  if (
    !loggedUser ||
    !Array.isArray(users) ||
    users.length < 2 ||
    !users[0] ||
    !users[1]
  ) {
    console.log("[getSenderFull] Invalid input, returning null");
    return null;
  }
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (!Array.isArray(messages) || !m || !m.sender || !userId) {
    console.log("[isSameSenderMargin] Invalid input, returning default");
    return 0;
  }

  if (
    i < messages.length - 1 &&
    messages[i + 1]?.sender?._id === m.sender._id &&
    m.sender._id !== userId
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1]?.sender?._id !== m.sender._id &&
      m.sender._id !== userId) ||
    (i === messages.length - 1 && m.sender._id !== userId)
  ) {
    return 0;
  }
  return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  if (!Array.isArray(messages) || !m || !m.sender || !userId) {
    console.log("[isSameSender] Invalid input, returning false");
    return false;
  }

  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender?._id !== m.sender._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    m.sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  if (!Array.isArray(messages) || i >= messages.length || !userId) {
    console.log("[isLastMessage] Invalid input, returning false");
    return false;
  }

  return (
    i === messages.length - 1 &&
    messages[messages.length - 1]?.sender?._id !== userId &&
    messages[messages.length - 1]?.sender?._id
  );
};

export const isSameUser = (messages, m, i) => {
  if (!Array.isArray(messages) || !m || !m.sender || i <= 0) {
    console.log("[isSameUser] Invalid input, returning false");
    return false;
  }

  return messages[i - 1]?.sender?._id === m.sender._id;
};
