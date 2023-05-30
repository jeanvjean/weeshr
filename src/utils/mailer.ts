// /* eslint-disable @typescript-eslint/camelcase */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-empty-function */
// import {commonTemplate} from './templates/common.template';
// import * as smtpTransport from 'nodemailer-sendgrid-transport';
// import * as nodemailer from 'nodemailer';


// const MailService = async (subject: string, messageType: any, data: any, copiedUsers = []) => {
//   const transporter = nodemailer.createTransport(smtpTransport({
//     auth: {
//       api_user: process.env.MAIL_USER,
//       api_key: process.env.MAIL_PASSWORD
//     }
//   }));
//   const msg = {
//     to: data.email,
//     cc: copiedUsers,
//     from: process.env.MAIL_FROM,
//     subject,
//     html: commonTemplate(messageType, data),
//   };
//   transporter.sendMail(msg, function(error: any, info: any) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(`using ${msg.from}`);
//       console.log('Message sent: ' + info.response);
//     }
//   });
// };

// export default MailService;
