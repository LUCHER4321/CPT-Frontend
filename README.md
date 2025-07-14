# Life Tree Website

## Environment

### Variables

```
VITE_API_URL
VITE_WS_URL
VITE_PORT
```

### Secrets

```
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
```

## Plans

### Free

- Up to 5 Ph. Trees
- Up to 30 species per Ph. Tree
- Upload images many formats (jpg, jpeg, png, gif, svg)
- Professional visualization
- Access to Ph. Trees created by the community

### Pro

- US$9/month
- US$86.40/year (US$7.20/month)
- Up to 20 Ph. Trees
- Up to 150 species per Ph. Tree
- Up to 10 collaborators per Ph. Tree
- Upload images many formats (jpg, jpeg, png, gif, svg)
- Professional visualization
- Access to Ph. Trees created by the community

### Premium

- US$19/month
- US$182.40/year (US$15.20/month)
- Unlimited Ph. Trees
- Unlimited Ph. Trees
- Unlimited per Ph. Tree
- Up to 30 collaborators per Ph. Tree
- Upload images many formats (jpg, jpeg, png, gif, svg)
- Professional visualization
- Access to Ph. Trees created by the community
