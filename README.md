# RedwoodSDK Blog Addon

This addon creates a blog for your RedwoodSDK project.

## How to add to your project

These instructions you are starting with a RedwoodSDK project, for example from `npx create-rwsdk -t minimal my-project-name`.

### 0. Decide whether to add this manually or via AI

To use your editor's AI agent support to add this addon for you (e.g. Cursor, VSCode Copilot):
1. Make sure your project dir is open in your editor. You can create a new project with: `npx create-rwsdk -t minimal my-project-name`
2. Open a new AI chat window for your project
3. Make sure you are in `Agent` mode
4. Send the following chat prompt in the chat window - it will do the rest for you!

```txt
Please apply this addon to my RedwoodSDK project using these instructions: https://raw.githubusercontent.com/redwoodjs/blog-addon/refs/heads/main/README.md
```

Alternatively, to apply this addon manually, simply follow the steps below.

### 1. In the root of your project, create a `content-collections.ts` file with the following:

```tsx
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.md",
  schema: (z) => ({
    title: z.string(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document); // HTML compilation for Workers
    return {
      ...document,
      html,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
```

### 2. Update `package.json`

Add the following dependencies to your `package.json` file:

```json
"devDependencies": {
  "@content-collections/core": "^0.9.0",
  "@content-collections/markdown": "^0.1.4",
  "@content-collections/vite": "^0.2.4",
  "zod": "^3.25.49"
}
```

Then run `pnpm install`

### 3. Update `vite.config.mts`:

Add the following to your `vite.config.mts` file:

```typescript
import contentCollections from "@content-collections/vite";
...
plugins: [
  ...,
  contentCollections(),
],
```

### 4. Update `tsconfig.json`

Add the following to your `tsconfig.json` file. Inside, the `paths` definition:

```json
"paths": {
  ...
  "content-collections": ["./.content-collections/generated"]
},
```

### 5. Update `.gitignore`

Add the following to your `.gitignore` file.

```
.content-collections
```

### 5. Inside the `src/app/` directory, create a `content/posts` folder

Inside the `src/app` directory, create a folder called `content/posts`. Then, inside, create a new file called ``. Add the following content:

```markdown
---
title: "The Day a Goat Hijacked Our Drone Test"
---

It was supposed to be a routine day for the ContentCrafter Inc. team. The Collectors were off on another adventure, the Validators were ready with their magnifying glasses, and the Transformers had their creative juices flowing. Little did we know, a mischievous goat was about to turn our day upside down.
```

