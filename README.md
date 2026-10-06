# Life Tree Website

The Life Tree is a frontend web application designed for creating, sharing & visualizing phylogenetic trees (Ph. Trees). It features a tiered subscription model, real-time collaboration capabilities & a community-driven platform for exploring evolutionary data.

## Tech Stack

- **Framework & Language**: React & React DOM initialized via Vite, utilizing TypeScript
- **Styling**: Tailwind CSS
- **Core Functionality**: chrono-phylo-tree for phylogenetic visualizations
- **Real-time Collaboration**: Socket.io Client for live multi-user interactions
- **Payments & Monetization**: PayPal SDK for subscription management
- **Code Quality**: ESLint

## Pricing & Plans

All plans include professional visualization tools, access to community-created Ph. Trees & the ability to upload images in multiple formats (jpg, jpeg, png, gif, svg).

- **Free Plan**: Create up to 5 Ph. Trees with a maximum of 30 species per tree, this tier includes advertisements
- **Pro Plan ($9.00/month or $86.40/year)**: Create up to 20 Ph. Trees with up to 150 species per tree, supports up to 10 collaborators per tree & removes all ads
- **Premium Plan ($19.00/month or $182.40/year)**: Create unlimited Ph. Trees with unlimited species, supports up to 30 collaborators per tree & removes all ads
- **Institutional Plan**: Includes unlimited Ph. Trees & species, up to 30 collaborators per tree & an ad-free experience, it also provides premium accounts for all institution members & a personalized domain

## Environment Setup

To run this project locally, configure the following variables & secrets in your environment:

- **API & Networking**: `VITE_API_URL`, `VITE_WS_URL`, `VITE_PORT`, `VITE_API_KEY`
- **SEO & Social**: `VITE_META_DESC`, `VITE_META_URL`, `VITE_DISCORD`, `VITE_GITHUB`
- **Payments (PayPal)**: `VITE_PAYPAL_URL`, `VITE_PAYPAL_ID`, `VITE_PAYPAL_SECRET`
- **Subscription IDs**: `VITE_PRO_M_ID`, `VITE_PRO_Y_ID`, `VITE_PREMIUM_M_ID`, `VITE_PREMIUM_Y_ID`
- **Advertising Integration**: `VITE_GOOGLE_ADSENSE_CLIENT_ID`, `VITE_GOOGLE_ADSENSE_TXT`, `VITE_GOOGLE_ADSENSE_SLOT`, `VITE_ADSTERRA_SRC`, `VITE_ADSTERRA_CONTAINER_ID`

## System Architecture (Enums)

The application relies on several core TypeScript enums to handle state & data categorization:

- **Account Management**: `Plan` (Free, Pro, Premium, Institutional), `Billing` (Monthly, Annual) & `Role` (Admin, User, Boss)
- **Social & Notifications**: `Liked` (Tree, Comment) & `NotiFunc` (Follow, Tree, Comment, Like, Collaborate)
- **Tree Operations**: `TreeProp` (Tree, Node, Collaborators, Comments) & `TreeChange` (New, Edit, Delete, Tree)
- **Filtering & Sorting**: `TreeCriteria` (CreatedAt, UpdatedAt, Likes, Comments, Views, Name, Popularity) & `Order` (Asc, Desc)
- **Metrics & Ads**: `TimeUnit` (Y, KY, MY, BY, TY) & `AdMethod` (Google Adsense, Adsterra)

## License

This project utilizes open-source libraries licensed under the MIT License (React, Tailwind CSS, Vite, Socket.io, ESLint, chrono-phylo-tree) & the Apache-2.0 License (TypeScript, PayPal SDK). Full texts can be found in the [`LICENSES/`](/LICENSES/) directory.
