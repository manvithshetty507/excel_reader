# How to Clone, Modify, and Deploy Your Project

Follow these steps to clone the repository, modify the Excel file, push changes to your personal GitHub repository, and deploy the project to Vercel.

## 1. Clone the Repository

1. Open a terminal or command prompt.

2. Clone the repository using the following command. Replace `your-username` and `your-repository` with the appropriate values:

    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```

3. Navigate into the project directory:

    ```bash
    cd your-repository
    ```

## 2. Change the Excel File

1. Go to the `assets` folder located in the `public` directory. This folder contains the Excel file to be read by the project.

2. Replace the existing Excel file with your new file. If the new file has a different name than `50-sample-contacts-list-excel.xlsx`, update the file name in the `fetch` call within the `ExcelReader` component. Modify the line at line 14 in `components/ExcelReader.js` to match the new file name.

3. Start the Development Server to run the project locally:

    ```bash
    npm run dev
    ```

## 3. Upload to GitHub

1. Create a GitHub repository and get the URL.

2. Run the following commands to initialize Git, add a remote repository, stage changes, commit, and push to the remote repository:

    ```bash
    # Initialize Git (if needed)
    git init

    # Add remote repository
    git remote add origin https://github.com/your-username/your-repository.git

    # Stage changes
    git add .

    # Commit changes
    git commit -m "Initial commit"

    # Push changes to the remote repository
    git push -u origin main
    ```

## 4. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/) and log in or sign up if you don't have an account.

2. Click on the “New Project” button.

3. Connect your GitHub account to Vercel if it’s not already connected.

4. Select your personal GitHub repository from the list.

5. Configure the deployment settings if needed (most of the time, Vercel auto-detects settings).

6. Click the “Deploy” button.

7. Wait for Vercel to build and deploy your project. You will be provided with a live URL once the deployment is complete.

## Additional Notes

- Ensure that any environment variables or configuration settings required for your project are set in Vercel.
- Verify that your new Excel file works correctly with your project before pushing changes and deploying.

If you encounter any issues or need further assistance, consult the [Vercel documentation](https://vercel.com/docs) or the [GitHub documentation](https://docs.github.com/en/github) for more detailed guidance.

