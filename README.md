<h1 align='center'>Chat Application</h1>

<h6 align='center'>A simple chat app made using  <a href='https://github.com/t3-oss/create-t3-app'>The T3 Stack</a>.</h6>
<br>

### 🛠️ Installation & Set Up

1. Clone the repo

```sh
git clone https://github.com/prashantrahul141/PrivateChatApplication
```

2. Add env file using these vars:

```sh
# Prisma
DATABASE_URL=postgresql db url

# Next Auth
# You can generate the secret via https://generate-secret.vercel.app/32
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Next Auth Discord Provider
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Github
_GITHUB_CLIENT_ID=
_GITHUB_CLIENT_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

You can see these docs to learn how to create OAuth app for <a href='https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps'>Github</a>, <a href='https://developers.google.com/identity/protocols/oauth2'>Google</a>, <a href='https://discord.com/developers/docs/topics/oauth2'>Discord</a>.

3. Install packages

```sh
npm i
```

4. Run the development build

```sh
npm run dev
```

<br>

### 🖼️ Screenshots

<img src="/public/static/meta/screenshot-1.png" alt="screenshot" width="500"/><br>
<img src="/public/static/meta/screenshot-2.png" alt="screenshot" width="500"/><br>
<img src="/public/static/meta/screenshot-3.png" alt="screenshot" width="500"/><br>
<img src="/public/static/meta/screenshot-4.png" alt="screenshot" width="500"/><br>
<img src="/public/static/meta/screenshot-5.png" alt="screenshot" width="500"/><br>
<img src="/public/static/meta/screenshot-6.png" alt="screenshot" height="500"/><br>
<img src="/public/static/meta/screenshot-7.png" alt="screenshot" height="500"/><br>

<br>

### 💻 Technologies used

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Prisma (with PostgresSQL)](https://prisma.io)
- [NextAuth.js](https://next-auth.js.org)
