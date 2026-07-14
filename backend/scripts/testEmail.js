import nodemailer from "nodemailer";

// Hardcoded credentials for testing
const EMAIL_USER = "vanshchauhan3751@gmail.com"; // Replace with your actual email
const EMAIL_PASSWORD = "cerv mokk lykp ybuv"; // Replace with your actual app password

async function testEmail() {
  try {
    console.log("Testing email functionality...");
    console.log(`Using email: ${EMAIL_USER}`);
    
    // Create transporter with debug option
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      },
      debug: true // Enable debug logs
    });

    // Verify connection
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection verified successfully");
    
    // Send test email to yourself
    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: `"DermaLens Test" <${EMAIL_USER}>`,
      to: EMAIL_USER, // Send to yourself
      subject: "Email Test Script",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>DermaLens Email Test</h2>
          <p>This is a test email from the test script.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      `
    });

    console.log(`Test email sent successfully: ${info.messageId}`);
  } catch (error) {
    console.error("Error testing email:", error);
    
    // More detailed error information
    if (error.code === 'EAUTH') {
      console.error("Authentication failed. Please check your email and password.");
      console.error("If using Gmail, make sure you're using an App Password, not your regular password.");
    }
  }
}

// Run the test
testEmail();
