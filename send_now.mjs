import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const KEY = 'AKIAWJJ3D2R5Q6WZWLNG';
const SECRET = process.env.AWS_SECRET;
const REGION = 'us-east-1';

console.log('Using key:', KEY);
console.log('Secret length:', SECRET ? SECRET.length : 'MISSING');

const sesClient = new SESClient({
  region: REGION,
  credentials: { accessKeyId: KEY, secretAccessKey: SECRET }
});

const snsClient = new SNSClient({
  region: REGION,
  credentials: { accessKeyId: KEY, secretAccessKey: SECRET }
});

// Send email
try {
  const emailResult = await sesClient.send(new SendEmailCommand({
    Source: 'cdozier14@athlynx.ai',
    Destination: { ToAddresses: ['cdozier14@athlynx.ai'] },
    Message: {
      Subject: { Data: 'ATHLYNX - Welcome to The Playbook' },
      Body: { Text: { Data: 'You just signed in to ATHLYNX. Welcome to The Athlete\'s Playbook!' } }
    }
  }));
  console.log('EMAIL SENT:', emailResult.MessageId);
} catch(e) {
  console.log('EMAIL ERROR:', e.message);
}

// Send SMS
try {
  const smsResult = await snsClient.send(new PublishCommand({
    PhoneNumber: '+16014985282',
    Message: 'ATHLYNX: You just signed in. Welcome to The Athlete\'s Playbook!'
  }));
  console.log('SMS SENT:', smsResult.MessageId);
} catch(e) {
  console.log('SMS ERROR:', e.message);
}
