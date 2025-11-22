# Shadcn Landing Page Template

## <a href="https://ui.shadcn.com/" target="_blank">Shadcn</a> + <a href="https://nextjs.org/" target="_blank">Next.js</a> + <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> + <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>.

### This is a project conversion <a href="https://github.com/leoMirandaa/shadcn-vue-landing-page" target="_blank">Shadcn-Vue</a> to NextJS

![Alt text](./public/demo-img.jpg)

## Sections

- [x] Navbar
- [x] Sidebar(mobile)
- [x] Hero
- [x] Sponsors
- [x] Benefits
- [x] Features
- [x] Testimonials
- [x] Team
- [x] Community
- [x] Contact
- [x] Pricing
- [x] Frequently Asked Questions(FAQ)
- [x] Services
- [x] Footer

## Features

- [x] Fully Responsive Design
- [x] User Friendly Navigation
- [x] Dark Mode

## How to install

1. Clone this repositoy:

```bash
git clone https://github.com/nobruf/shadcn-landing-page.git
```

2. Go into project

```bash
cd shadcn-landing-page
```

3. Install dependencies

```bash
npm install
```

4. Run project

```bash
npm run dev
```



## Environment Variables

Make sure to configure the following environment variables in your Replit Secrets:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `EMAIL_HOST` - SMTP server host
- `EMAIL_PORT` - SMTP server port
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `NEXT_PUBLIC_APP_URL` - Your application URL
- `NEXT_ADMIN_EMAIL` - Admin email address for receiving shipment tracking notifications (required for admin tracking notifications)

### Email Notifications

The application sends the following email notifications:

1. **Shipment Confirmation** - Sent to sender and recipient when a shipment is created
2. **Login Notification** - Sent to user when they log into their account
3. **Admin Tracking Alert** - Sent to admin (NEXT_ADMIN_EMAIL) when a shipment is tracked
