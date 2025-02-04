require("dotenv").config();
const https = require("https");
const { App } = require("@slack/bolt");
const { channel } = require("diagnostics_channel");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  app.logger.info("⚡️ Bolt app is running!");

  // Optionally, you can call `findConversation` here or on specific events
  await findConversation("C089K7Q25BR");
})();

// Find conversation ID using the conversations.list method
async function findConversation(conversationId) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
    });
    console.log("Fetched conversation" + result.channels[50].name);

    // let conversationId = C089K7Q25BR;

    // Look through the channels to find the one with the matching name
    for (const channel of result.channels) {
      if (conversationId === channel.id) {
        // Print result
        console.log("Found conversation: " + channel.name);
        break; // Exit the loop once found
      }
    }

    if (!conversationId) {
      console.log(`No conversation found with the ID: ${conversationId}`);
    }

    return channel.name;
  } catch (error) {
    console.error("Error fetching conversation:", error);
  }
}
