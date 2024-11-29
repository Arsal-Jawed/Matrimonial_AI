const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arsaljawed9999@gmail.com',
        pass: 'whjn bbsr wevs knbz'
    }
});

const sendEmail = (to, subject, htmlContent) => {
    const mailOptions = {
        from: 'arsaljawed9999@gmail.com',
        to: to,
        subject: subject,
        html: htmlContent
    };

    console.log("Mail Send");

    return transporter.sendMail(mailOptions);
};

const proposeMeeting = (to, subject, htmlContent) => {
    const mailOptions = {
        from: 'arsaljawed9999@gmail.com',
        to: 'arsaljawed9999@gmail.com',
        subject: subject,
        html: htmlContent
    };

    console.log("Mail Send");

    return transporter.sendMail(mailOptions);
};

const getEmailTemplate = (username, message, proposedName, country, city, occupation, religion) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
            <!-- Header Image -->
            <div style="width: 100%; overflow: hidden; border-radius: 8px 8px 0 0;">
            <img src="https://images.coolwallpapers.me/picsup/5420298-anniversary-wallpapers.jpg" alt="Header Image" style="width: 100%; height: auto; border-radius: 8px 8px 0 0;">
           </div>
            <!-- Email Content -->
            <div style="padding: 20px;">
                <h2 style="color: #9b0425; font-style:italic; text-align: center; font-size: 24px; margin-bottom: 10px;">Hello ${message},</h2>
                <p style="font-size: 16px; color: gray; line-height: 1.5;">
                    <strong>${username}</strong> from <strong>${country}/${city}</strong> has proposed to you.
                </p>
                <p style="font-size: 16px; color: gray; line-height: 1.5;">
                    <strong>Religion:</strong> ${religion}<br/>
                    <strong>Occupation:</strong> ${occupation}
                </p>
                <div style="background-color: #ffabe3; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #d3eaf2;">
                    <p style="font-size: 16px; color: #9b0425; text-align: center; line-height: 1.5;">
                        <strong>Message for You:</strong><br/>
                        "${proposedName}"
                    </p>
                </div>
                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 16px; color: #FF2CB9; font-weight: bold; margin-bottom: 10px;">
                        Take the Next Step, Visit:
                    </p>
                    <a href="http:192.168.100.115:3000" style="display: inline-block; padding: 12px 25px; margin: 10px; font-size: 16px; color: #ffffff; background-color: #9b0425; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Matrimonial</a>
                </div>
                <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 20px;">
                    Regards,<br/>
                    Matrimonial AI Team
                </p>
            </div>
        </div>
    `;
};

const getMeetingTemplate = (username, proposedName, country, city, occupation, religion, place, address, placeCity) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 2px solid #9b0425; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <!-- Header Image -->
            <div style="width: 100%; overflow: hidden; border-radius: 12px 12px 0 0; background-color: #ffebe6;">
                <img src="https://nvdaily.ru/wp-content/uploads/2022/05/engagement-1357696_1920.jpg" alt="Header Image" style="width: 100%; height: auto; border-radius: 12px 12px 0 0;">
            </div>
            
            <!-- Card Content -->
            <div style="padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #9b0425; font-style: italic; text-align: center; font-size: 24px; margin-bottom: 20px;">Marriage Meeting Proposal</h2>
                <p style="font-size: 16px; color: gray; line-height: 1.5;">
                    <strong>${username}</strong> from <strong>${country}/${city}</strong> has extended a proposal for a marriage meeting.
                </p>
                <p style="font-size: 16px; color: gray; line-height: 1.5; margin-top: 10px;">
                    <strong>Religion:</strong> ${religion}<br/>
                    <strong>Occupation:</strong> ${occupation}
                </p>
                
                <div style="background-color: #ffabe3; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #d3eaf2;">
                    <p style="font-size: 16px; color: #9b0425; text-align: center; line-height: 1.5;">
                        <strong>Location of Meeting:</strong><br/>
                        ${place}, ${placeCity}<br/>
                        <strong>Address:</strong> ${address}
                    </p>
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 16px; color: #FF2CB9; font-weight: bold; margin-bottom: 10px;">
                        Ready to Take the Next Step? Visit Us:
                    </p>
                    <a href="http://localhost:3000" style="display: inline-block; padding: 12px 25px; margin: 10px; font-size: 16px; color: #ffffff; background-color: #9b0425; text-decoration: none; border-radius: 8px; font-weight: bold;">Visit Matrimonial</a>
                </div>
                
                <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 20px;">
                    Regards,<br/>
                    Matrimonial AI Team
                </p>
            </div>
        </div>
    `;
};



module.exports = { sendEmail, proposeMeeting, getEmailTemplate, getMeetingTemplate };
