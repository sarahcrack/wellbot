require('dotenv').config();
const https = require('https');
const { App } = require('@slack/bolt');

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

  app.logger.info('⚡️ Bolt app is running!');

  // Optionally, you can call `findConversation` here or on specific events
  await findConversation("wellbot");
})();

// Find conversation ID using the conversations.list method
async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN
    });

    let conversationId = null;

    // Look through the channels to find the one with the matching name
    for (const channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;

        // Print result
        console.log("Found conversation ID: " + conversationId);
        break; // Exit the loop once found
      }
    }

    if (!conversationId) {
      console.log(`No conversation found with the name: ${name}`);
    }

    return conversationId;
  }
  catch (error) {
    console.error('Error fetching conversation:', error);
  }
}
