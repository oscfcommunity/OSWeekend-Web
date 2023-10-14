# Open Source Weekend (OSW)

Welcome to the [Open Source Weekend (OSW)](https://github.com/oscfcommunity/OSWeekend) repository! OSW represents a dynamic community endeavor with a core mission to consistently champion and honor open-source technologies. Our overarching objective is to establish a vibrant platform fostering the exchange of knowledge, fostering collaborative efforts, and nurturing the exploration of diverse open-source projects.

This is an initiative by [Open Source Community Foundation (OSCF)](https://github.com/oscfcommunity)! 

### OSW - Backend
1. Create a `.env` file in the main folder with the following content:

   ```
   DBURL="_Your MongoDB Collection URL_"
   PORT=4000
   JWT_SEC="Open Source Weekend"
   MAILER="your_email@gmail.com"
   EMAILPASS="your_email_app_password"
   OTPSEC="THIS IS SECRET"
   ```

2. Create a folder named `uploads`. Inside this folder, create a few other folders, such as `blog`.

3. After completing the above steps, run the following command in your terminal:

   ```
   npm i
   ```

### OSW - Frontend
1. In your frontend folder, run the following command in your terminal:

   ```
   npm i --force
   ```

2. After the installation is complete, you can start the frontend by running:

   ```
   npm start
   ```

### For Chat App
1. After completing the frontend setup, create a `.env` file in the `ChatApp` folder located at `your-frontend-folder/src/components/`. Write the following content:

   ```
   DBURL="_Your MongoDB Collection URL_"
   PORT=9000
   ```

2. In the terminal, navigate to the path `your-frontend-folder/src/components/ChatApp`.

3. Run the following command in the terminal:

   ```
   npm i
   ```

4. After the installation, start the Chat App by running:

   ```
   npm start
   ```
