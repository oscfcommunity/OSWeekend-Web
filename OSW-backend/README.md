# OSW - Backend Setup

1. **Create a `.env` File:**
   - In the main folder, create a file named `.env`.
   - Add the following content to the `.env` file:
     ```
     DBURL="_Your MongoDB Collection URL_"
     PORT=4000
     JWT_SEC="Open Source Weekend"
     MAILER="d******123@gmail.com"
     EMAILPASS="_App password from the upper user mail as mailer email from Google_"
     OTPSEC="THIS IS SECRET"
     ```

2. **Create Folders:**
   - In the main folder, create a folder named `uploads`.
   - Inside the `uploads` folder, initialize and create a few other folders, including `blog`.

3. **Install Dependencies:**
   - Open your terminal.
   - Navigate to the main project folder.
   - Run the following command to install dependencies:
     ```
     npm i
     ```
