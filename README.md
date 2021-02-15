# MovieFlex - Frontend side

## Website link

http://movieflexfront.herokuapp.com/

## Description

This project is connected with an API, it receives more than 25,000 movies stored in a database to show them in the UI.

## Languages / Frameworks / Techniques

- JSX
- JavaScript
- CSS3
- FlexBox / Grid system
- ReactJS
- Reusable Class-based Components
- React Router
- OOP
- AJAX

## Pages
There are 9 pages on this website:
  - HomePage - totally different according to the displaying device.
  - Top Rated - it shows the top 50 movies according to IMDB rating. [Authorization Needed]
  - Most Popular - it shows most reviewed 50 movies. [Authorization Needed]
  - Watchlist - it shows movies that the user adds during its session. [Authorization Needed]
  - Single Movie - it shows details about the chosen movie with an IMDB search link with the movie title and a comment section where you can leave a comment - edit on it - delete it
  - Login
  - Signup
  - Verification
  - Not Found

## Components
All components are class-based and reusable, they are:
  - Button
  - Comment - this block displays one of two probabilities [blank area for new comment - retrieved comment from database].
  - Error
  - Footer
  - Header - it contains a search icon and box only on the browse page.
  - Input
  - Loader - it appears until the data retrieved successfully from the database.
  - MovieCard - movie card shows a single movie on browse page and at bottom of "Single Movie" page as related one.
  - Pagination - it appears at bottom of the browse page to help you navigate through the 1177 page.
  - PopMn - popup menu appears with verification page, redirection after signing up, comments, and plot in mobile view.
  - Rating - 5 stars block appears with movie and special movie cards and is filled according to the IMDB rating of that movie.
  - SideBar - [if a user is not authorized it will be redirected to the login page when trying to go to any page in the app except browse].
  - SpMovieCard - Special movie card appears in watchlist, top-rated and most popular pages
  - WlLoading - special loader appears while adding a movie to the watchlist, publishing a new comment, and deleting one as well.