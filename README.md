# Calorie Tracking Application

This application, built with React/Redux, Firebase(authentication and database), and the Nutritionix API, allows users to track their daily caloric intake by searching the Nutritionix database of foods with their corresponding calorie counts and log them on a daily basis. Users can also manually add items if they do not find what they are looking for. This application utilizes an algorithm that takes user's information (height, weight, age, activity level, and weight goals) and calculates a target daily intake. The app will then notify the user if they are on track to meet their goal or not.

## How To Use This Application

### First Time User Registration
1. Open the application in the browser of your choice.
2. For first time users, click the link at the bottom to register a new profile.
3. Enter an email as your username, and enter a desired password.
4. Once registered, fill out your required profile (Name, age, sex, height, weight, activity level and goal).

### Returning Users
1. Enter your login credentials from the landing screen to log in.

#### View Your History/Stats
1. Click the "track your progress" button from the home screen to see your history and statistics, and if you are on track to meet your goal. (This can also be accessed from the "History" button from the navigation bar when not on the home screen).
2. In this history section, individual days will be displayed with their corresponding dates and total calories for that day. You can click those links to view a summary of what you ate for that day.
3. At the top, your target calories will be displayed based on your goal, and your average actually eaten per day will be displayed. Below, an icon will be displayed indicating if you are on track or not.

### How to Log A Day

1. Click on the "Log A Day" button from the home screen or on the navigation bar if not on the home screen.
2. Select a date (Note: duplicate dates will not be accepted)
3. In the next screen, you can search the Nutritionix database for the item you are looking for by typing in that item in the search bar and pressing the search button.
4. Select the item from the list that is displayed in the modal. On the next screen you can select the number of servings that you ate.
5. If you cannot find what you are looking for, you may add an item manually by selecting the Manual Add link below the search bar. A modal will pop up where you can enter the name of the item, the calories per serving, and the number of servings you ate.
6. Items will be displayed below the search area. You can click the pencil icon to edit an item, the x button to delete that item, or the delete all button at the bottom to clear all items.
7. Total calories for the day will be displayed at the bottom of the screen.
8. You can leave this screen to another screen in the application without losing your data, but if you hit the cancel link at the bottom, your data and the date will reset.
9. Hit the submit button to add your day to your history and calculate it into your average (note: a past day cannot be edited at this time).

### Edit Your Profile

You may edit your profile at any time as your stats change. Click on the "Edit profile" button on the home screen or on the navigation bar.
