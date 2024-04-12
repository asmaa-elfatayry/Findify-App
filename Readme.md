# Findify App

Findify App is a web application designed to help users find their lost items or upload items they find to help others.

<div >
<img width="300" src="./public/images/assets/searcher child.gif"/>
</div>

## Features

- **User Authentication**: Users can create accounts and log in to the website.
- **View Lost Items**: Authenticated users can view all published posts about lost items.
- **Contact the Finder**: If a user finds their lost item listed on the website, they can click on "Contact the Finder" to open an email template to contact the person who found the item.
- **Report Unauthenticated Finders**: Users can report unauthenticated finders, which will be reviewed by the admin.
- **Create New Posts**: Users who found lost items can create new posts to inform others about the found item.
- **Track Found Items**: When a lost item is found and returned to its owner, the post about the lost item is automatically marked as "Item Found" and removed.
- **Admin Panel**: The admin can log in to manage unauthenticated users, confirm their authenticity, and remove them from the system along with their posts.

## Technologies Used

- Node.js: Backend server environment.
- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for storing user data and posts.
- Mongoose: MongoDB object modeling tool for Node.js.
- Bootstrap: Frontend framework for building responsive and mobile-first websites.
- EJS (Embedded JavaScript): Templating engine for - generating HTML markup with JavaScript.
- JWT (JSON Web Tokens): Authentication mechanism for securing API endpoints.
- bcrypt: Library for hashing passwords before storing them in the database.
- dotenv: Library for loading environment variables from a .env file.
- express-validator: Middleware for validating incoming request data.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
  jsonwebtoken: Library for generating and verifying JSON Web Tokens.
- jwt-decode: Library for decoding JSON Web Tokens on the client-side.
- multer: Middleware for handling multipart/form-data, primarily used for file uploads.

## APIs

- **GET /**: Get all published posts about lost items.
- **Get /login**: Render Login Page.
- **Get /signup**:Render Register Page.
- **GET /admin**: Get unauthenticated users (for admin only).

<hr/>

- **POST /signup**: Register a new user.
- **POST /login**: Login existing users.
- **POST /logout**: User logout and Remove Token.
- **POST /items**: Create a new post about a found item.

<hr/>

- **Put /users/:id**: Report an unauthenticated finder.
- **Put /items/:itemId**: Mark this item as delivered to his owner.

<hr/>

- **DELETE /admin/:userId**: Remove a user and their posts from the system (for admin only).

## APIs For just test

- **Get /items/:id**: Get item by id.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/asmaa-elfatayry/Findify-App.git
```

2. Navigate to the project directory:

```bash
cd findlostthings-app
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory and define the following variables:

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Start the server:

```bash
npm start
```

## Contribution

Feel free to contribute to this project by submitting pull requests.

## License

© Asmaa-Elfatayry - [2024]
