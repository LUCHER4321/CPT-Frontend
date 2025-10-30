# Life Tree Website

## Environment

### Variables

```
VITE_PAYPAL_URL
VITE_API_URL
VITE_WS_URL
VITE_PORT
```

### Secrets

```
VITE_PRO_M_ID
VITE_PRO_Y_ID
VITE_PREMIUM_M_ID
VITE_PREMIUM_Y_ID
VITE_PAYPAL_ID
VITE_PAYPAL_SECRET
VITE_API_KEY
```

## Enums

```typescript
export enum Billing {
  MONTHLY = "monthly",
  ANNUAL = "annual",
}

export enum Liked {
  TREE = "ph-tree",
  COMMENT = "comment",
}

export enum NotiFunc {
  FOLLOW = "follow",
  TREE = "tree",
  COMMENT = "comment",
  LIKE = "like",
  COLLABORATE = "collaborate",
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
  BOSS = "boss",
}

export enum Plan {
  FREE = "free",
  PRO = "pro",
  PREMIUM = "premium",
  INSTITUTIONAL = "institutional",
}

export enum TreeCriteria {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  LIKES = "likes",
  COMMENTS = "comments",
  VIEWS = "views",
  NAME = "name",
  POPULARITY = "popularity",
}

export enum TreeChange {
  NEW = "new",
  EDIT = "edit",
  DELETE = "delete",
  TREE = "tree",
}

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export enum TreeProp {
  TREE = "tree",
  NODE = "node",
  COLLABORATORS = "collaborators",
  COMMENTS = "comments",
}

export enum TimeUnit {
  Y = 1,
  KY = 1e3,
  MY = 1e6,
  BY = 1e9,
  TY = 1e12,
}
```

## Plans

### Free

- Up to 5 Ph. Trees
- Up to 30 species per Ph. Tree
- Upload images many formats (jpg, jpeg, png, gif, svg)
- Professional visualization
- Access to Ph. Trees created by the community

### Pro

- US$9.00/month
- US$86.40/year (US$7.20/month)
- Up to 20 Ph. Trees
- Up to 150 species per Ph. Tree
- Up to 10 collaborators per Ph. Tree
- Upload images many formats (jpg, jpeg, png, gif, svg)
- Professional visualization
- Access to Ph. Trees created by the community

### Premium

- US$19.00/month
- US$182.40/year (US$15.20/month)
- Unlimited Ph. Trees
- Unlimited species per Ph. Tree
- Up to 30 collaborators per Ph. Tree
- Upload images many formats (jpg, jpeg, png, gif, svg)
- Professional visualization
- Access to Ph. Trees created by the community

### Institutional

- Unlimited Ph. Trees
- Unlimited species per Ph. Tree
- Up to 30 collaborators per Ph. Tree
- Upload images many formats (jpg, jpeg, png, gif, svg)
- Professional visualization
- Access to Ph. Trees created by the community
- Premium accounts for all institution members
- Personalized domain

## Licenses and Attributions

This project uses the following open-source libraries:

### Dependencies

- **React & React DOM** - MIT License
- **Tailwind CSS** - MIT License
- **PayPal SDK** - Apache-2.0 License
- **Chrono-Phylo-Tree** - MIT License
- **Socket.io Client** - MIT License

### Development Dependencies

- **TypeScript** - Apache-2.0 License
- **Vite** - MIT License
- **ESLint & plugins** - MIT License

Full license texts are available in the `LICENSES/` directory.
