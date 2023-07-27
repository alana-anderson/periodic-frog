# Peroidic Frog

This is a simple Next.js project for productivity simulations.

## Pre-requisites

- Node.js v16.8.0 or later
- MySQL Server
- NVM (Node Version Manager)
- Prisma & Prisma Client v3.6.0

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
git clone https://github.com/alana-anderson/periodic-frog.git
```

2. Change into the project directory:

```bash
cd periodic-frog
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

3. Create your local database:

```sql
CREATE DATABASE localfrog;
```

4. Use the new database:

```sql
USE localfrog;
```

5. SIDE NOTE: Keep this terminal open and running the MySQL command prompt. You will need it to run the application. Open another terminal window to run your development server.

6. Set your DATABASE_URL in the `.env` file. If this file does not exist, create it & the contents of this file should be:

```bash
DATABASE_URL="mysql://root:<your_mysql_password>@localhost:3306/localfrog"
```

7. Apply the migrations to create the database schema:

```bash
npx prisma migrate dev
```

8. Generate the Prisma client:
```bash
npx prisma generate
```

9. View your DB in action with Prisma Studio (http://localhost:5555):
```bash
npx prisma studio
```

For more information on your database, see [Your Database and you.](https://github.com/alana-anderson/periodic-frog/wiki/Your-Database-and-you)

## Environment Variables

Create a `.env.local` file at the project root with the following content:

```bash
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=<your_mysql_password>
DATABASE_NAME=localfrog
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=<generate>
```

Replace `<your_mysql_password>` with your actual MySQL root user password.

Within your `.env.local` file, add a `NEXTAUTH_SECRET` variable. This variable will be used to encrypt the session cookie. You can generate a random string using the following command:
```bash
openssl rand -base64 32

// output
// mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=
```

Make `.env.local` is added to your `.gitignore`` to prevent accidentally uploading sensitive information.


## Verifying the Database Connection

To verify that your application can successfully connect to the MySQL database using the provided environment variables, you can use the provided script `checkDbConnection.js`.

```bash
node checkDbConnection.js
```

The script will attempt to connect to the MySQL database using the configuration provided in the environment variables. If the connection is successful, it will log a success message. If the connection fails, it will log an error message.

If the connection is successful, you should see a message like:
```bash
Successfully connected to the database.
```

If the connection fails, you will see an error message detailing the issue. Ensure that your environment variables are set up correctly and that your MySQL server is running.

Remember that terminal window with MySQL server running? Go back to that and run the following command to check your tables:

```bash
SHOW TABLES;
```

For more information on your database, see [Your Database and you](https://github.com/alana-anderson/periodic-frog/wiki/Your-Database-and-you)

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


---

## Project Structure 

Below is a brief overview of the important directories and files in this project:

- `src/app`: This directory contains the main application code. 
  - `api`: This directory holds server-side code responsible for handling API endpoints.
    - `getMessage`: A test directory containing the code responsible for retrieving messages from the database.
    - `graphql`: This directory contains GraphQL server setup and resolvers.
  - `dashboard`: This directory contains code related to the application's dashboard feature.
  - `forecasts`: This directory contains code related to the application's forecasts feature.
  - `projects`: This directory contains code related to the application's projects feature.
  - `scenarios`: This directory contains code related to the application's scenarios feature.
  - `team`: This directory contains code related to the application's team and RBAC.
  - `ApolloClient.js`: This is a configuration file for the Apollo Client, which communicates with your GraphQL server.
- `components`: This directory contains shared React components.
- `styles`: This directory contains global styles for the application.
- `utils`: This directory contains global utility classes for the application.
- `public`: This directory contains public files like images and fonts.
- `checkDbConnection.js`: This script checks the connection to the database.
- `db.js`: This file handles creating a connection pool to the MySQL database.
- `next.config.js`: This is a Next.js configuration file.

## Debugging Tips

Information dedicated to common issues and fixes.

### checkDbConnection failed with error: ER_ACCESS_DENIED_ERROR

```bash
Unable to connect to the database: Error: Access denied for user ''@'localhost' (using password: NO)
```

1. Try hard coding your env variables in the `db.js` file. If this works, then you know that your env variables are not being read correctly. Further debugging may be required, but this is a good first step. 

2. Try running the `checkDbConnection.js` and await response.

3. Attempt to connect to the database using the MySQL command line client. If you are able to connect, then you know that your MySQL server is running and that your credentials are correct. If you are unable to connect, then you know that your MySQL server is not running or that your credentials are incorrect.

4. Attempt to access `/api/graphql`. If you are able to access the GraphQL playground and make a successful query, then you know that your GraphQL server is running and that your credentials are correct. If you are unable to access the GraphQL playground or make a successful query, then you know that your GraphQL server is not running or that your credentials are incorrect.

