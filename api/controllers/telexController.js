async function notifyTelexChannel(channelId) {
  const url = "https://ping.telex.im/v1/webhooks/019532f8-45b3-7578-973e-b9a3eb67ab63";
  const data = {
    event_name: "Ping to RemindME",
    message: `PING from Telex channel - ${channelId} to RemindME successfully`,
    status: "success",
    username: "RemindME"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log("Telex notification:", json);
  } catch (err) {
    console.error("Error notifying Telex:", err);
  }
}

module.exports = { notifyTelexChannel };
