# 💰 AI-Powered Daily Costing & Expense Tracker

A modern, intelligent personal finance management system that helps users track daily expenses, monitor spending habits, and receive AI-driven insights for better money management.

## 🚀 Features

### Core Functionality

- **Expense Management**: Add, edit, and delete daily expenses with multiple categories
- **Reports & Analytics**: Daily, weekly, monthly, and yearly summaries with visual charts
- **Category Tracking**: Comprehensive categorization of expenses with color-coded visualization
- **Real-time Dashboard**: Live updates of spending patterns and statistics

### AI-Powered Insights

- **Smart Analysis**: AI detects overspending patterns and spending habits
- **Personalized Tips**: Get actionable suggestions to reduce unnecessary spending
- **Budget Recommendations**: AI-suggested monthly budgets based on spending history
- **Blog Recommendations**: Relevant financial articles based on spending patterns

### Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Automatic theme switching support
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Smooth Animations**: Enhanced user experience with modern UI components

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI Components
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenAI GPT API
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icons

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd costing-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```bash
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/expense-tracker

   # OpenAI Configuration
   OPENAI_API_KEY=your-openai-api-key-here

   # NextAuth Configuration (optional)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── expenses/      # Expense CRUD operations
│   │   ├── analytics/     # Statistics and reports
│   │   └── ai/           # AI insights generation
│   └── page.tsx          # Main dashboard page
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── expense/          # Expense-related components
│   ├── charts/           # Chart components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility functions
│   ├── mongodb.ts        # Database connection
│   ├── openai.ts         # AI integration
│   └── utils.ts          # Helper functions
├── models/               # MongoDB models
│   ├── User.ts
│   ├── Expense.ts
│   ├── Blog.ts
│   └── Budget.ts
└── types/                # TypeScript type definitions
    └── index.ts
```

## 🎯 Usage Guide

### Adding Expenses

1. Click the "Add Expense" button on the dashboard
2. Fill in the amount, select a category, and add optional notes
3. Choose the date (defaults to today)
4. Click "Add Expense" to save

### Viewing Analytics

- **Overview Tab**: See expense distribution charts and AI insights
- **Analytics Tab**: View detailed category breakdowns and percentages
- **Recent Expenses**: Quick access to your latest transactions

### AI Insights

- The AI analyzes your spending patterns automatically
- Get personalized tips for reducing expenses
- Receive category-specific recommendations
- Access relevant financial articles and resources

## 🔮 Future Enhancements

- **Multi-user Support**: Family and group expense tracking
- **Mobile App**: React Native implementation
- **Export Features**: PDF and Excel report generation
- **Income Tracking**: Complete financial overview
- **Savings Goals**: Goal setting and progress tracking
- **Gamification**: Financial health scoring system
- **Voice Input**: Voice-based expense entry
- **Receipt Scanning**: OCR for automatic expense entry

## 📊 Database Schema

### Expense Model

```typescript
{
  userId: string;
  amount: number;
  category: ExpenseCategory;
  note?: string;
  date: Date;
}
```

### User Model

```typescript
{
  name: string;
  email: string;
  password: string;
}
```

### Budget Model

```typescript
{
  userId: string;
  category: ExpenseCategory;
  monthlyLimit: number;
  currentSpent: number;
  month: number;
  year: number;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing problems
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [ShadCN UI](https://ui.shadcn.com/) for beautiful UI components
- [OpenAI](https://openai.com/) for AI-powered insights
- [Vercel](https://vercel.com/) for hosting and deployment
- [MongoDB](https://www.mongodb.com/) for database services
