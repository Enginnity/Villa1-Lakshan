import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const { EMAIL_USER, EMAIL_PASS } = process.env

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("EMAIL_USER or EMAIL_PASS environment variables are not set. Email sending will fail.")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body ?? {}

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"Sunset Villa Website" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: `New Inquiry from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
      html: `
        <h2>New Villa Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    const guestMailOptions = {
      from: `"Sunset Villa Galle" <${EMAIL_USER}>`,
      to: email,
      subject: "We received your inquiry",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2933;">
          <h2 style="color: #0b5d5c;">Ayubowan ${name.split(" ")[0] || ""},</h2>
          <p>
            Thank you for contacting Sunset Villa inside the historic Galle Fort. Our reservations team is reviewing your
            message and will be in touch within 24 hours.
          </p>
          <p style="margin: 16px 0; padding: 12px 16px; background-color: #f1f5f9; border-radius: 12px;">
            <strong>Your message:</strong><br />
            <em>${message.replace(/\n/g, "<br />")}</em>
          </p>
          <p>
            If you need a quicker response, feel free to call or WhatsApp us directly at
            <a href="tel:+94771234567" style="color: #0b5d5c; font-weight: 600;">+94 77 123 4567</a>.
          </p>
          <p>Warm regards,<br />Sunset Villa Concierge Team</p>
        </div>
      `,
    }

    try {
      await transporter.sendMail(guestMailOptions)
    } catch (error: unknown) {
      console.error("Guest confirmation email failed:", error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form submission failed:", error)
    return NextResponse.json({ error: "Unable to send message. Please try again later." }, { status: 500 })
  }
}

