using API.Interfaces.Services;
using MailKit.Net.Smtp;
using MimeKit;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(
    string to,
    string subject,
    string body)
    {
        var email = new MimeMessage();

        email.From.Add(
            MailboxAddress.Parse(
                _config["EmailSettings:Email"]!));

        email.To.Add(
            MailboxAddress.Parse(to));

        email.Subject = subject;

        email.Body = new TextPart("html")
        {
            Text = body
        };

        using var smtp = new SmtpClient();

        await smtp.ConnectAsync(
        "smtp.gmail.com",
        587,
        MailKit.Security.SecureSocketOptions.StartTls);

        await smtp.AuthenticateAsync(
            _config["EmailSettings:Email"]!,
            _config["EmailSettings:Password"]!);

        await smtp.SendAsync(email);

        await smtp.DisconnectAsync(true);

    }
}