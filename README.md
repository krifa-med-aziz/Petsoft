# 🐾 Petsoft

A modern pet management application built with Next.js 15, designed to help pet owners organize and track their furry friends' information.

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Radix_UI-000000?style=flat-square&logo=radix-ui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white"/>
</div>

## ✨ Features

- **🔐 Secure Authentication** - User registration and login with NextAuth.js
- **🐕 Pet Management** - Add, edit, and delete pet profiles
- **🔍 Search & Filter** - Easily find pets by name or owner
- **📊 Dashboard Overview** - View all pets with statistics
- **💳 Payment Integration** - Stripe-powered subscription system
- **📱 Responsive Design** - Works seamlessly on all devices
- **🎨 Modern UI** - Beautiful interface with Tailwind CSS and Radix UI

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & Database

- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Production database
- **SQLite** - Development database
- **NextAuth.js v5** - Authentication solution

### Payment & Integration

- **Stripe** - Payment processing
- **Webhooks** - Real-time payment updates

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Turbopack** - Fast bundler for development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (for production)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/krifa-med-aziz/Petsoft.git
   cd Petsoft/petsof
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth
   AUTH_SECRET="your-secret-key-here"

   # Stripe
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
   STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
   STRIPE_PRICE_ID="price_your_price_id"

   # App
   CANONICAL_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Protected app routes
│   ├── (auth)/            # Authentication pages
│   ├── (marketing)/       # Public marketing pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── contexts/              # React contexts
├── lib/                   # Utility functions and configurations
├── actions/               # Server actions
└── styles/                # Global styles

prisma/
├── schema.prisma          # Database schema
├── seed.ts               # Database seeding
└── migrations/           # Database migrations
```

## 🗃️ Database Schema

### User Model

- **id**: Unique identifier
- **email**: User email (unique)
- **hashedPassword**: Encrypted password
- **hasAccess**: Premium access flag
- **pets**: Related pet records

### Pet Model

- **id**: Unique identifier
- **name**: Pet name
- **ownerName**: Owner's name
- **imageUrl**: Pet photo URL
- **age**: Pet age
- **notes**: Additional notes
- **userId**: Owner reference

## 🎯 Key Features Detail

### Authentication Flow

1. **Registration** - New users sign up with email/password
2. **Login** - Existing users authenticate
3. **Payment** - Users purchase access via Stripe
4. **Dashboard** - Access to pet management features

### Pet Management

- **Add Pets** - Create new pet profiles with photos
- **Edit Pets** - Update pet information
- **Delete Pets** - Remove pet records
- **Search** - Find pets by name or owner

### Payment System

- **Stripe Integration** - Secure payment processing
- **Webhook Handling** - Automatic access granting
- **Subscription Model** - One-time payment for lifetime access

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma db seed` - Seed the database

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production

```env
# Database (PostgreSQL)
POSTGRES_PRISMA_URL="your-postgres-connection-string"
POSTGRES_URL_NON_POOLING="your-postgres-direct-connection"

# NextAuth
AUTH_SECRET="your-production-secret"

# Stripe (Production Keys)
STRIPE_SECRET_KEY="sk_live_your_live_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_live_your_live_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_live_webhook_secret"
STRIPE_PRICE_ID="price_your_live_price_id"

# App
CANONICAL_URL="https://your-domain.com"
```

## 🔒 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **CSRF Protection** - Built-in NextAuth.js protection
- **Webhook Verification** - Stripe webhook signature validation
- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Prisma ORM protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Med Aziz Krifa**

- GitHub: [@krifa-med-aziz](https://github.com/krifa-med-aziz)

## 🙏 Acknowledgments

- **Vercel** - For Next.js and deployment platform
- **Prisma** - For the amazing database toolkit
- **Stripe** - For payment processing infrastructure

## 📞 Support

If you have any questions or need help with setup, please feel free to:

- Open an issue on GitHub
- Contact the author

---

Made with ❤️ for pet lovers everywhere 🐾
