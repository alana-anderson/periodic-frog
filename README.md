# Peroidic Frog

This is a simple Next.js project connected to a MySQL database.

## Pre-requisites

- Node.js v16.8.0 or later
- MySQL Server
- NVM (Node Version Manager)

Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | zsh
# or 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

For those running zsh, ensure that these lines exist in your .zshrc file:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Install the LTS version of Node.js. Note that this application is using an experimental feature of Next.js (experimental.appDir) that requires Node.js version 16.8.0 or later.

```bash
nvm install 16.8.0
nvm use 16.8.0

# confirm node version
node -v
```


## Project Setup

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Change into the project directory:

```bash
cd <project_name>
```

3. Install the dependencies:

```bash
npm install
```

## Database Setup

1. Start the MySQL server:

```bash
mysql.server start
```

2. Log in to the MySQL command prompt:

```bash
mysql -u root -p
```

3. Create a new database:

```sql
CREATE DATABASE localfrog;
```

4. Use the new database:

```sql
USE localfrog;
```

5. Create a new table:

```sql
CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY,
  message VARCHAR(255)
);
```

## Environment Variables

Create a `.env.local` file at the project root with the following content:

```bash
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=<your_mysql_password>
DATABASE_NAME=localfrog
```

Replace `<your_mysql_password>` with your actual MySQL root user password.

## Running the Application

To start the application, run:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Testing the API

Navigate to `http://localhost:3000/api/getMessages` to see the messages from the MySQL `messages` table.

---

This `README.md` file provides all the instructions necessary for setting up the project and the database, running the application, and testing the API.


## Other Mentions

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


Absolutely, here's an example of what your `README.md` file could look like:

---


