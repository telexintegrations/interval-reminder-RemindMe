# RemindME Integration API

RemindME is an integration service designed to send periodic hydration reminders via email. It leverages Telex's interval integration to automatically trigger a tick endpoint that sends notifications using Mailjet. This project is built with Node.js and Express, following a modular design for scalability and maintainability.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Interval Integration:** Telex handles the scheduling and periodic calling of your tick endpoint.
- **Email Notifications:** Uses Mailjet to send hydration reminder emails.
- **Telex Webhook:** Notifies the Telex channel when the tick endpoint is triggered.
- **Modular Design:** Organized codebase with separate controllers, routes, utilities, and configuration.
- **Easy Configuration:** Integration settings stored in a standalone JSON file.

## Project Structure

```
project-root/
├── api/
│   ├── config/
│   │   └── integrationConfig.json # Integration configuration file
│   ├── controllers/
│   │   ├── hydrationController.js # Logic to determine hydration messages
│   │   └── telexController.js # Handles Telex webhook notifications
│   ├── routes/
│   │   ├── drinkWater.js # Tick endpoint for sending email notifications
│   │   └── home.js # Home endpoints (home page, config, time)
│   ├── utils/
│   │   └── mailjetClient.js # Utility to send emails via Mailjet
│   └── index.js # Main server entry point
├── .env # Environment variable definitions
└── package.json # Project metadata and dependencies
```

## Prerequisites

- **Node.js:** Version 18+ is recommended (for native `fetch` support) or include a polyfill if using an earlier version.
- **npm:** Node Package Manager.
- **Mailjet Account:** Required for sending emails. Sign up and obtain your API keys.
- **Telex Integration Setup:** Configure your integration via [Telex docs](https://docs.telex.im/docs/Integrations/Examples/uptime-monitor-interval-integration).

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/telexintegrations/interval-reminder-RemindMe
   cd interval-reminder-RemindMe
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
MJ_APIKEY_PUBLIC=your_mailjet_public_key
MJ_APIKEY_PRIVATE=your_mailjet_private_key
SENDER_EMAIL=your_verified_sender_email
PORT=8000
```

Replace the placeholder values with your actual Mailjet API keys and sender email address.

## Running the Application

Start the server by running:

```bash
node api/index.js
```

You should see a message confirming the server is running on the specified port (default is 8000).

## Endpoints

### Home Endpoints

- **GET /** – Returns a simple "Home page" message.
- **GET /config** – Returns the integration configuration in JSON format (loaded from `api/config/integrationConfig.json`).
- **GET /time** – Returns the current server time.

### Tick Endpoint

- **POST /drink-water** – This endpoint is called by Telex at defined intervals.

#### Request Body:

A JSON payload with an array of settings that must include a "User Email" entry:

```json
{
  "settings": [
    {
      "label": "User Email",
      "default": "your_email@example.com"
    },
    {
      "label": "interval",
      "default": "* * * * *"
    }
  ]
}
```

#### Behavior:

- Notifies the Telex channel via a webhook.
- Checks if it is the correct time to send a hydration reminder.
- Sends an email via Mailjet if the conditions are met.
- Responds with either a success message, a "Not yet!" response, or an error message based on the input and current time.

## Testing with Postman

### GET Requests:

- **GET `http://localhost:8000/`** – Should return: Home page.
- **GET `http://localhost:8000/config`** – Should return the JSON configuration.
- **GET `http://localhost:8000/time`** – Should return the current time in JSON format.

### POST Request for `/drink-water`:

- **Method:** POST  
- **URL:** `http://localhost:8000/drink-water`  
- **Headers:** Set `Content-Type` to `application/json`.  
- **Body:** Use raw JSON:

```json
{
  "settings": [
    {
      "label": "User Email",
      "default": "your_email@example.com"
    },
    {
      "label": "interval",
      "default": "* * * * *"
    }
  ]
}
```

#### Expected Response:

- If the current time is one of the scheduled times (7, 11, 13, 15, 17, 19, or 21), an email is sent and you receive a success message.
- If not, the response will be:

  ```json
  { "message": "Not yet!" }
  ```

- Error messages will be returned if the payload is missing required settings.

## Contributing

Contributions are welcome! If you have ideas for improvements, feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Enjoy and remember to stay hydrated!**  
The RemindME Team

