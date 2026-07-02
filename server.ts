import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route: Contact Form Handler
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, course, comments } = req.body;

      if (!name || !email || !course) {
        return res.status(400).json({
          status: "error",
          message: "Required fields are missing: name, email, and course/program must be provided."
        });
      }

      console.log(`[Contact API] Received inquiry from ${name} (${email}) for program: ${course}`);

      // Extract SMTP settings from environment variables
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpSenderName = process.env.SMTP_SENDER_NAME || "Business Intelligence Lab Admissions";
      const contactReceiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "businessintelligencelab7@gmail.com";

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #fcfcfc;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0;">New Admission Inquiry</h2>
          <p style="font-size: 14px; color: #475569; margin-bottom: 20px;">A user has submitted the inquiry form on the Business Intelligence Lab portal.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; font-size: 14px; width: 35%; color: #334155;">Full Name:</td>
              <td style="padding: 10px; font-size: 14px; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; font-size: 14px; color: #334155;">Email Address:</td>
              <td style="padding: 10px; font-size: 14px; color: #0f172a;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; font-size: 14px; color: #334155;">Phone Number:</td>
              <td style="padding: 10px; font-size: 14px; color: #0f172a;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; font-size: 14px; color: #334155;">Selected Program:</td>
              <td style="padding: 10px; font-size: 14px; color: #0284c7; font-weight: 600;">${course}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; font-size: 13px; color: #475569; text-transform: uppercase; tracking-wider: 0.05em;">Message / Comments:</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #0f172a; line-height: 1.5; white-space: pre-wrap;">${comments || "No additional comments provided."}</p>
          </div>

          <div style="font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 25px;">
            <p style="margin: 0;">This email was automatically generated and sent from your portal's Express backend on Cloud Run.</p>
            <p style="margin: 5px 0 0 0;">Business Intelligence Lab • Mangalore, Karnataka</p>
          </div>
        </div>
      `;

      const textBody = `
        New Admission Inquiry Received:
        
        Full Name: ${name}
        Email Address: ${email}
        Phone Number: ${phone || "Not provided"}
        Selected Program: ${course}
        
        Message/Comments:
        ${comments || "No additional comments."}
      `;

      // Check if SMTP is configured
      if (smtpHost && smtpUser && smtpPass) {
        console.log(`[Contact API] Attempting to deliver real email via SMTP host ${smtpHost}...`);
        
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // True for 465, false for other ports (like 587)
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: `"${smtpSenderName}" <${smtpUser}>`,
          to: contactReceiverEmail,
          replyTo: email,
          subject: `New Portal Inquiry: ${name} - ${course}`,
          text: textBody,
          html: htmlBody
        });

        console.log("[Contact API] Real SMTP email successfully sent.");
        return res.status(200).json({
          status: "success",
          deliveryType: "real",
          message: "Your inquiry has been successfully sent to the admissions desk via secure SMTP email!"
        });
      } else {
        console.warn("[Contact API] SMTP credentials not set up. Falling back to secure log simulation.");
        console.log(`========= SIMULATED EMAIL OUTBOX =========
To: ${contactReceiverEmail}
Subject: New Portal Inquiry: ${name} - ${course}
Body:
${textBody}
==========================================`);

        return res.status(200).json({
          status: "success",
          deliveryType: "simulated",
          message: "Inquiry registered successfully! Note: Configure SMTP credentials in the Secrets panel to activate automated email delivery."
        });
      }
    } catch (error: any) {
      console.error("[Contact API] Failed to send email:", error);
      return res.status(500).json({
        status: "error",
        message: "Your inquiry was saved, but we encountered an error while dispatching the confirmation email: " + error.message
      });
    }
  });

  // Serve static files / Vite Middleware
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Server] Vite dev server mounted in middleware mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[Server] Serving production static files from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Express full-stack portal listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Fatal server startup failure:", err);
  process.exit(1);
});
