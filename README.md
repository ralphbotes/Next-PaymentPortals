# Payment Portal Web App

This is a Next.js web application designed to integrate various payment portals seamlessly. The app includes comprehensive examples and functionalities for querying, redirecting, and handling webhooks with different payment gateways.

## Features

- **Next.js**: Utilizes the powerful React framework Next.js for server-side rendering, routing, and optimized performance.
- **MUI (Material-UI)**: Implements Google's Material Design guidelines using MUI, a popular React component library. This ensures a consistent and attractive user interface with a set of pre-designed, customizable components. For more info and setup see https://mui.com/
- **Ngrok**: Uses Ngrok to create a secure tunnel to your local machine, allowing the exposure of the local server to the internet for testing webhooks and remote access. For more info and setup see https://ngrok.com/

## Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/ralphbotes/Next-PaymentPortals.git
   cd Next-PaymentPortals

2. **Env setup**
   Create a .env.local file and add your host url:
   NEXT_PUBLIC_HOST=your-url.com/
   NEXT_PUBLIC_PAYGATE_SECRET=secret
   NEXT_PUBLIC_PAYGATE_MERCHANT=10011072130

3. **Installs**
   Run the following commands in terminal:
   - **npm i**
   - **npm install -g ngrok**
   - **ngrok authtoken <your_auth_token>**: Supplied on your ngrok dashboard

4. **Run**
   - **ngrok http 3000**: Start ngrok server. Then copy and paste the url supplied into the env file as your host, and in the .vscode launch.json file.
   - **npm run dev**: Start the web-app server and redirect either to http://localhost:3000/ or the url supplied by ngrok (the one you copied in as your host).