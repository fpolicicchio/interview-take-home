# Interview - Technical Take Home

Welcome to Abra's take home technical interview. This assignment is to be completed at home and you should spend less than an hour on it.

Step 1 is to fork this repo. You'll be working off of your own copy of it and then sharing that back to your interviewer. Once you've created at fork, continue to "Getting started".

## Getting started

Congratulations, you've been hired by Company Z for exactly 1 hour. They've given you access to their top secret application called Zeta. It's a Next.js application written in TypeScript that helps their customers keep their profiles up-to-date.

They've given you a list of tasks to complete within the alloted time. It's important to note, they aren't looking for the entire list to be completed. They're looking for you to spend your time wisely and rationaly. You have complete technical and creative freedom.

## Tasks

### 1. Improve email handling and validation

Zeta's customers often update their accounts with email addresses that aren't valid. Change the form to improve the user experience around updating the email field and update the API to prevent invalid email submissions.

**Tip**: Don't spend too much time on a regex to have perfect validation. There are libraries, or use something simple for now.

### 2. Add a new field for the customer's phone number

Company Z needs to be able to reach out to their customer by phone. Add a new field to the form called "Phone" and save the phone number to the user.

### 3. Allow users to clear their name and phone number

Company Z understands that certain customers want to keep anonymity beyond their email. Update the form and the backend to allow customers to clear their name and phone number.

### 4. Improve error handling

Sometimes the backend API is unavailable due to maintenance or other reasons. When this happens, Zeta explodes and provides little feedback to the customer. They'd like to start with a simple improvement to tell the customer that the form submission failed. Update the user experience to show a toast if the API call fails.
