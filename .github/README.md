# Project Name

## Description
This project is a web application built with Angular for the client-side and Node.js for the server-side. It includes features for managing assignments and classes, with data fetched from GitHub and cached locally.

## Features
- Fetch assignments from GitHub Classroom
- Cache assignments locally
- Responsive UI with various interactive elements
- Concurrent server processes

## Technologies Used
- **Client-side**: Angular, TypeScript, CSS
- **Server-side**: Node.js, Express, Octokit
- **Build Tools**: npm, Parcel, Nodemon, Concurrently

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies for the server:
    ```sh
    cd server
    npm install
    ```

3. Install dependencies for the client:
    ```sh
    cd ../client
    npm install
    ```

## Usage

### Running the Server
To start the server, run the following command in the `server` directory:
```sh
npm start
```

### Running the Client
To start the client, run the following command in the `client` directory:
```sh
ng serve
```

### Accessing the Application
Open your web browser and navigate to `http://localhost:4200`.

## Configuration
Ensure you have a `app.config.json` file in the root directory with the following structure:
```json
{
  "organization": "your-github-organization"
}
```

## File Structure
```
your-repo-name/
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── class-choice-view/
│   │   │   │   ├── class-choice-view.component.css
│   │   │   │   ├── class-choice-view.component.html
│   │   │   │   ├── class-choice-view.component.ts
│   │   │   ├── ...
│   ├── index.html
│   ├── ...
├── server/
│   ├── assignments.mjs
│   ├── classes.mjs
│   ├── package.json
│   ├── ...
├── app.config.json
├── ...
```

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## Contact
For any inquiries, please contact [your-email@example.com].



## Notes to add later
Server utilizes terminal messages to display information about the server's status and the data being fetched from GitHub. 
Server color code:
File write success: green, Error: red, Request: cyan, Server listening: blue.