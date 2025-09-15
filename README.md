# ContractFlow - SaaS Contracts Dashboard

A modern React + Tailwind CSS single-page application for managing SaaS contracts with AI-powered insights.

## Features

- **Authentication**: Mock login system (username: any, password: test123)
- **Dashboard**: Professional contract management interface
- **Contract Management**: View, search, and filter contracts
- **Contract Details**: Detailed view with clauses, AI insights, and evidence
- **File Upload**: Drag & drop contract upload simulation
- **Responsive Design**: Mobile-first responsive layout
- **State Management**: Context API for centralized state

## Tech Stack

- **Frontend**: React 18, Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **State Management**: React Context API
- **File Upload**: react-dropzone
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd contracts-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes for mock data
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard-*.tsx   # Dashboard-specific components
│   └── *.tsx             # Feature components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets and mock data
\`\`\`

## Key Design Decisions

### Authentication
- Mock authentication system for demo purposes
- JWT token simulation with localStorage persistence
- Protected routes with automatic redirects

### State Management
- Context API chosen over Redux for simplicity
- Separate contexts for auth, app state, and contracts
- Custom hooks for data fetching and state management

### API Design
- Next.js API routes for mock backend
- RESTful endpoints (/api/contracts, /api/contracts/[id])
- Simulated loading states and error handling

### UI/UX
- Professional SaaS design with red/amber color scheme
- Mobile-first responsive design
- Comprehensive loading and error states
- Accessible components with proper ARIA labels

### File Upload
- react-dropzone for drag & drop functionality
- Simulated upload progress with random success/failure
- Support for PDF, DOC, and DOCX files

## Mock Data

The application uses mock data for demonstration:
- 5 sample contracts with varying statuses and risk levels
- Detailed contract information with clauses, insights, and evidence
- Simulated API responses with realistic delays

## Deployment

The application is configured for Vercel deployment:

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

## Environment Variables

No environment variables required for the demo version.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
