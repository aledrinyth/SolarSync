# SolarSync: Cold Chain Optimizer

SolarSync is an intelligent Digital Twin(virtual sensor) and predictive dashboard designed to turn commercial cold rooms into thermal batteries. By cross-referencing live weather data, solar intensity forecasts, and grid pricing(or your own contract terms), SolarSync recommends and automates optimal cooling schedules. 

When a solar surge is predicted, SolarSync drops the fridge set-point (e.g., from -18°C to -21°C) to "bank" free energy. When cloud cover hits or grid prices spike, the system coasts on the stored thermal energy, avoiding peak charges while maintaining safe food storage temperatures.

## Key Features
* **Live Shield Dashboard**: Real-time monitoring of solar output, grid prices, and thermal battery status.
* **Cloud Pulse Prediction Engine**: Uses machine learning and AI in order to predict and map cloud density against energy prices, featuring a plug-and-play architecture for tailored models to individuals.
* **Financial Optimizer**: Tracks "Sun Tax" avoided, peak demand shaving, and progress towards Net Zero export goals.
* **Asset Health**: Monitors compressor stress and enforces mechanical safety modes to prevent short-cycling and protect hardware. (If available)

---

## Local Setup Instructions

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* npm (comes with Node.js)

### 1. Clone & Install
Clone the repository and install the required dependencies:
```bash
# Install dependencies
npm install
```

### 2. Run the Development Server
Start the full-stack development server (this runs both the Express backend and the Vite frontend middleware):
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### 3. Plugging in your ML Model
SolarSync is designed to easily integrate your own Machine Learning model for solar intensity and cloud prediction.
1. Open `server/controllers/forecastController.ts`.
2. Locate the `getForecast` function.
3. Replace the simulated `data` array generation with your actual ML model inference or external API call.
4. The frontend will automatically poll this endpoint every 60 seconds and update the "Cloud Pulse" graphs.

---

## Google Cloud Run Deployment

SolarSync is fully configured to be deployed as a containerized application on Google Cloud Run. The easiest way to deploy is using Cloud Run's source-based deployment (which uses Cloud Buildpacks automatically).

### Prerequisites
1. Create a [Google Cloud Project](https://console.cloud.google.com/) and enable billing.
2. Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).

### 1. Authenticate CLI
Log in to your Google Cloud account and set your target project:
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### 2. Deploy to Cloud Run
Run the following command from the root directory of the project. Cloud Run will automatically detect the Node.js environment, install dependencies, run the build script (`npm run build`), and start the server.

```bash
gcloud run deploy SolarSync \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```

* **`--source .`**: Tells Cloud Run to build the container directly from your source code.
* **`--allow-unauthenticated`**: Makes the dashboard publicly accessible over the internet.
* **`--port 3000`**: Matches the port exposed by our Express server in `server.ts`.

### 3. Access your App
Once the deployment finishes, the CLI will output a secure `https://` URL (e.g., `https://SolarSync-xyz123-uc.a.run.app`). Click the link to view your live production dashboard!

---

## Tech Stack
* **Frontend**: React 19, Vite, Tailwind CSS v4, Recharts, Lucide React, Motion.
* **Backend**: Node.js, Express.
* **Language**: TypeScript.
