const express = require("express");
const router = express.Router();
const { notifyTelexChannel } = require("../controllers/telexController");
const { sendTelexReminder } = require("../controllers/telexReminder")
const { getRandomWaterBenefit } = require("../inMemoryDb/getMessage")

router.post("/", async (req, res) => {
  const payload = req.body;
  if (!payload || !payload.settings) {
    return res.status(400).json({ error: "Invalid payload: settings missing" });
  }
  if (payload.channel_id){
    const channelId = payload.channel_id
    await notifyTelexChannel(channelId);
  }

  if (payload.return_url){
    const channelUrl = payload.return_url;
    const message = getRandomWaterBenefit()
    await sendTelexReminder(channelUrl, message)
    .then((result) => {
      console.log("Response:", result);
      res.status(200).json({ message: "Reminder sent successfully!" });
    })
    .catch((err) => {
      console.error("Mailjet Error:", err);
      res.status(500).json({ error: "Failed to send reminder" });
    });
  }
});

module.exports = router;
