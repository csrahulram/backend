import type { Attachment } from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

export type Message = {
  recipients: string[], message: string, subject?: string, attachments?: Attachment[]
}

export default class SendEmail {
  private _service = process.env.EMAIL_SERVICE || '';
  private _username = process.env.EMAIL_USERNAME || '';
  private _password = process.env.EMAIL_PASSWORD || '';
  private _transporter: any;

  constructor() {
    this._transporter = nodemailer.createTransport({
      service: this._service,
      auth: {
        user: this._username,
        pass: this._password
      },
    });
  }

  async send(body: Message) {
    const { recipients, subject, message, attachments } = body;
    const result = await this._transporter.sendMail({
      from: this._username,
      to: recipients,
      subject,
      html: message,
      attachments
    });
    return result;
  }


}