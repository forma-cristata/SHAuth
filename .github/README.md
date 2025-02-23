# SHAuth

https://github.com/user-attachments/assets/4324d6b1-b844-4e94-8ad1-895c70a9487c

# Project Name

## Description
This full-stack application gives students an extra layer of protection when submitting code assignments via SHA for an organization.

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

### Running the Full Stack Locally
To start the full app locally, run the following command in the `client` directory:
```sh
concurrently \"ng serve\" \"cd ../server && npm start\"
```

### Running the Server Independently
To start the server, run the following command in the `server` directory:
```sh
npm start
```

### Running the Client Independently
To start the client, run the following command in the `client` directory:
```sh
ng serve
```

### Accessing the Application
Open your web browser and navigate to `http://localhost:4912`.

## Configuration
Ensure you have a `app.config.json` file in the root directory with the following structure:
```json
{
   "gitHubAccessToken" : "INSERT ORG TOKEN HERE",
   "pollTime" : "00:01",
   "organization": "ORG NAME"
}
```

### Additional Configuration
* If the app does not load correctly, you should delete your local cookies and ensure app.config.json has valid values for all keys.  
* Configure the names of your GitHub access token, poll time that you prefer, and your organization as it appears in GitHub inside of app.config.json.

## Terminal Messages Color Code
The server utilizes terminal messages to display information about the server's status and the data being fetched from GitHub. The color codes used are as follows:
* File write success: \x1b[32m (green)
* Error: \x1b[31m (red)
* Request: \x1b[36m (cyan)
* Server listening: \x1b[34m (blue)

## Functionality
This project helps students verify their GitHub SHA (commit ID) before submitting assignments. New coding students often struggle with GitHub's complex interface, leading them to submit incorrect commit IDs to Canvas—resulting in lost credit and frustrated teachers. Our application provides a simplified interface where students can verify that their chosen commit originates from the correct assignment.

The setup requires a teacher to configure and host two servers using their organization's authentication token and name. Teachers can set a polling schedule in app.config.json to update the database when new assignments are released. Once hosted, students can browse their organization's classes and assignments. When they select an assignment, the system uses their username to verify if their entered commit ID matches their cloned repository.

For local testing, you can run the application by executing npm install followed by start. The application uses Concurrently to launch both servers and the client simultaneously.

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
│   ├── modules
│   ├── server.mjs
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
For any inquiries, please contact kaci.a.craycraft@gmail.com
