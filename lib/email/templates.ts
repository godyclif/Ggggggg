
import { ShipmentEmailData } from '@/types/email';

export function generateSenderEmailHTML(data: ShipmentEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shipment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">RapidWave Transport</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Shipment Confirmation</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">Dear ${data.senderName},</p>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #666666; line-height: 1.6;">
                Your shipment has been successfully created and is being processed. Below are the details of your shipment:
              </p>
              
              <!-- Tracking Number -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
                    <p style="margin: 0; font-size: 24px; color: #667eea; font-weight: bold; font-family: monospace;">${data.trackingNumber}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Shipment Details -->
              <h2 style="margin: 30px 0 15px 0; font-size: 18px; color: #333333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Shipment Details</h2>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="font-size: 14px; color: #666666; width: 40%; padding: 8px 0;">Package Type:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.packageType.charAt(0).toUpperCase() + data.packageType.slice(1)}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Weight:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.weight || 'N/A'} kg</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Dimensions:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.dimensions.length || 'N/A'} × ${data.dimensions.width || 'N/A'} × ${data.dimensions.height || 'N/A'} cm</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Declared Value:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">$${data.value}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Service Type:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1)}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Priority:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Shipping Cost:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">$${data.shippingCost}</td>
                </tr>
                ${data.description ? `
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Description:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.description}</td>
                </tr>
                ` : ''}
              </table>
              
              <!-- Addresses -->
              <h2 style="margin: 30px 0 15px 0; font-size: 18px; color: #333333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Shipping Information</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="vertical-align: top; padding-right: 2%;">
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin-bottom: 10px;">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #667eea; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">From (You)</p>
                      <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6;">
                        ${data.senderAddress}<br>
                        ${data.senderCity}, ${data.senderState} ${data.senderZip}<br>
                        ${data.senderCountry}
                      </p>
                    </div>
                  </td>
                  <td width="48%" style="vertical-align: top; padding-left: 2%;">
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin-bottom: 10px;">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #667eea; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">To</p>
                      <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6;">
                        ${data.recipientName}<br>
                        ${data.recipientAddress}<br>
                        ${data.recipientCity}, ${data.recipientState} ${data.recipientZip}<br>
                        ${data.recipientCountry}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Dates -->
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-top: 20px;">
                <tr>
                  <td style="font-size: 14px; color: #666666; width: 40%; padding: 8px 0;">Shipping Date:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${new Date(data.shippingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Estimated Delivery:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${new Date(data.estimatedDeliveryDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://rapidwavetransport.com'}/track?tn=${data.trackingNumber}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Track Your Shipment</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #666666; line-height: 1.6;">
                You can track your shipment anytime using the tracking number above. If you have any questions, please don't hesitate to contact our support team.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: bold;">RapidWave Transport</p>
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666;">support@rapidwavetransport.com | 1-800-RAPIDWAVE</p>
              <p style="margin: 0; font-size: 11px; color: #999999;">© ${new Date().getFullYear()} RapidWave Transport. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateRecipientEmailHTML(data: ShipmentEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Incoming Shipment Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">RapidWave Transport</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Incoming Shipment Notification</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">Dear ${data.recipientName},</p>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #666666; line-height: 1.6;">
                A package has been shipped to you by <strong>${data.senderName}</strong>. Below are the details of your incoming shipment:
              </p>
              
              <!-- Tracking Number -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
                    <p style="margin: 0; font-size: 24px; color: #667eea; font-weight: bold; font-family: monospace;">${data.trackingNumber}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Package Details -->
              <h2 style="margin: 30px 0 15px 0; font-size: 18px; color: #333333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Package Details</h2>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="font-size: 14px; color: #666666; width: 40%; padding: 8px 0;">Package Type:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.packageType.charAt(0).toUpperCase() + data.packageType.slice(1)}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Weight:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.weight || 'N/A'} kg</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Service Type:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1)}</td>
                </tr>
                ${data.description ? `
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Description:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.description}</td>
                </tr>
                ` : ''}
              </table>
              
              <!-- Addresses -->
              <h2 style="margin: 30px 0 15px 0; font-size: 18px; color: #333333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Shipping Information</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="vertical-align: top; padding-right: 2%;">
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin-bottom: 10px;">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #667eea; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">From</p>
                      <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6;">
                        ${data.senderName}<br>
                        ${data.senderAddress}<br>
                        ${data.senderCity}, ${data.senderState} ${data.senderZip}<br>
                        ${data.senderCountry}
                      </p>
                    </div>
                  </td>
                  <td width="48%" style="vertical-align: top; padding-left: 2%;">
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin-bottom: 10px;">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #667eea; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">To (You)</p>
                      <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6;">
                        ${data.recipientAddress}<br>
                        ${data.recipientCity}, ${data.recipientState} ${data.recipientZip}<br>
                        ${data.recipientCountry}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Dates -->
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-top: 20px; background-color: #e8f5e9; border-radius: 6px; padding: 15px;">
                <tr>
                  <td style="font-size: 14px; color: #2e7d32; width: 40%; padding: 8px 0;">Estimated Delivery:</td>
                  <td style="font-size: 16px; color: #1b5e20; font-weight: bold; padding: 8px 0;">${new Date(data.estimatedDeliveryDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://rapidwavetransport.com'}/track?tn=${data.trackingNumber}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Track Your Package</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #666666; line-height: 1.6;">
                You can track your package anytime using the tracking number above. We'll notify you when your package is out for delivery.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: bold;">RapidWave Transport</p>
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666;">support@rapidwavetransport.com | 1-800-RAPIDWAVE</p>
              <p style="margin: 0; font-size: 11px; color: #999999;">© ${new Date().getFullYear()} RapidWave Transport. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}



export function generateLoginNotificationHTML(data: {
  userName: string;
  loginTime: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Login Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">RapidWave Transport</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">New Login Alert</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">Dear ${data.userName},</p>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #666666; line-height: 1.6;">
                We detected a new login to your RapidWave Transport account. If this was you, you can safely ignore this email.
              </p>
              
              <!-- Alert Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 14px; color: #856404; font-weight: bold;">Security Alert</p>
                    <p style="margin: 5px 0 0 0; font-size: 13px; color: #856404;">A new login was detected on your account.</p>
                  </td>
                </tr>
              </table>
              
              <!-- Login Details -->
              <h2 style="margin: 30px 0 15px 0; font-size: 18px; color: #333333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Login Details</h2>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="font-size: 14px; color: #666666; width: 40%; padding: 8px 0;">Login Time:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.loginTime}</td>
                </tr>
                ${data.ipAddress ? `
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">IP Address:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.ipAddress}</td>
                </tr>
                ` : ''}
                ${data.location ? `
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Location:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.location}</td>
                </tr>
                ` : ''}
                ${data.userAgent ? `
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Device/Browser:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0; word-break: break-word;">${data.userAgent}</td>
                </tr>
                ` : ''}
              </table>
              
              <!-- Security Notice -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-top: 30px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: bold;">Wasn't you?</p>
                    <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">
                      If you did not log in to your account, please contact our support team immediately at 
                      <a href="mailto:support@rapidwavetransport.com" style="color: #667eea; text-decoration: none;">support@rapidwavetransport.com</a> 
                      or call 1-800-RAPIDWAVE.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #666666; line-height: 1.6;">
                For your security, we recommend changing your password regularly and enabling two-factor authentication if available.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: bold;">RapidWave Transport</p>
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666;">support@rapidwavetransport.com | 1-800-RAPIDWAVE</p>
              <p style="margin: 0; font-size: 11px; color: #999999;">© ${new Date().getFullYear()} RapidWave Transport. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateAdminTrackingNotificationHTML(data: {
  trackingNumber: string;
  trackedBy?: string;
  trackingTime: string;
  ipAddress?: string;
  shipmentStatus: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shipment Tracking Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">RapidWave Transport</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Shipment Tracking Notification</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">Dear Admin,</p>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #666666; line-height: 1.6;">
                A shipment has been tracked on the system. Below are the tracking details:
              </p>
              
              <!-- Tracking Number -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 5px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
                    <p style="margin: 0; font-size: 24px; color: #667eea; font-weight: bold; font-family: monospace;">${data.trackingNumber}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Tracking Details -->
              <h2 style="margin: 30px 0 15px 0; font-size: 18px; color: #333333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Tracking Details</h2>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="font-size: 14px; color: #666666; width: 40%; padding: 8px 0;">Tracking Time:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.trackingTime}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Shipment Status:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.shipmentStatus}</td>
                </tr>
                ${data.trackedBy ? `
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">Tracked By:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.trackedBy}</td>
                </tr>
                ` : ''}
                ${data.ipAddress ? `
                <tr>
                  <td style="font-size: 14px; color: #666666; padding: 8px 0;">IP Address:</td>
                  <td style="font-size: 14px; color: #333333; font-weight: 600; padding: 8px 0;">${data.ipAddress}</td>
                </tr>
                ` : ''}
              </table>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://rapidwavetransport.com'}/track?tn=${data.trackingNumber}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">View Shipment Details</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: bold;">RapidWave Transport Admin</p>
              <p style="margin: 0; font-size: 11px; color: #999999;">© ${new Date().getFullYear()} RapidWave Transport. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
