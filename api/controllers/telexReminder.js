async function sendTelexReminder(channelUrl, message) {
  const url = channelUrl;
  const data = {
    event_name: "Reminder",
    message: message,
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

module.exports = { sendTelexReminder };
