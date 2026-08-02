const admin = require("../config/firebase");

exports.sendNotification = async (
  token,
  title,
  body
) => {
  try {
    if (!admin.apps || !admin.apps.length) {
      console.log(`[Push Notification Mock] To: ${token} | Title: ${title} | Body: ${body}`);
      return { success: true, mocked: true };
    }
    return await admin.messaging().send({
      token,
      notification: {
        title,
        body,
      },
    });
  } catch (error) {
    console.error("Push notification error:", error.message);
    return { success: false, error: error.message };
  }
};