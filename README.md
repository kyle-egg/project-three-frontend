# Binge - A MERN Stack App

![Image of Binge](https://media.giphy.com/media/9jmrELs9Ta1iHfnaCS/giphy.gif)

My third project for the General Assembly Software Engineering Immersive course, a complex MERN stack app built with classmates [Theo Brooke](https://github.com/theobrooke009) and [Tomas Hedberg](https://github.com/hedbergen).

## Deployment

I deployed this website using Heroku and it is available [HERE](https://binge-sei.netlify.app/). The free servers on Heroku are a tad slow when they are not in use, so please allow a minute or two for them to wake up!

Please note registration is required, so you can either register your own account (takes seconds and we are GDPR friendly!) to experience the full functionality of the app. Otherwise please feel free to use the following: **Username:** bingeit **Password:** bingeit

## Table Of Contents
* Concept
* Project Brief
* Technologies Used
* Installation Instructions
* Wireframe and Story
* General Approach and Planning
* Backend
* Frontend
* Next Plan Of Action
* Finishing Touches
* Unsolved Problems
* Challenges
* Wins
* Features Wishlist 
* Key Learnings

## Concept

**Binge** is an application that makes picking a movie easy! This website optimises what you watch based on time, allowing for a user to choose a **Sprint** - Presenting movie options if time is of the essence, or a **Marathon** - Where users can create and save movie marathons if there is time to kill!

## Project Brief

* Build a full-stack application by making your own backend and your own front-end.
* Use an Express API to serve your data from a Mongo database.
* Consume your API with a separate front-end built with React.
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
* Have a visually impressive design.
* Be deployed online so it's publicly accessible.
* Timeframe: 7 days.

## Technologies Used
* MongoDB
* Express
* Node.js
* JavaScript (ES6)
* React.js
* HTML5
* CSS3 + SASS
* Material UI
* Axios
* React-router-dom
* React-select
* Mongoose
* Mongoose-unique-validator
* JSONWebToken
* Faker
* VS Code
* Git + GitHub
* Insomnia
* Heroku

## Installation Instructions

1. Clone repo code from GitHub onto your machine.
2. Open up server in VS Code.
3. Run `npm i` in your server directory to install all dependencies from the package.json file.
4. Run `npm run dev` from server to start the backend.
5. Open a second window of VS Code and open client.
6. Run `npm i` in your client directory to install all dependencies from the package.json file.
7. Run `npm run dev` from client to start the frontend.

## Wireframe And Story

We brainstormed together as a team over Zoom and wrote a few ideas down on how we wanted the website to flow and what features we wanted the application to have. 

![Story](https://imgur.com/a/wxeqvMm)

![Wireframe](https://imgur.com/a/mLeSCu9)

## General Approach & Planning

After coming up with the above idea and flow, we had a chat regarding what we individually wanted to tackle and where each of our strengths lie. Luckily for us, we had a very good mix of strengths and weaknesses within the team and managed to split ourselves up to our strengths. Theo wanted to tackle the backend, Tomas wanted to take care of the styling, leaving me more than happy to oversee the logic at the frontend.

Starting the code on Friday, we set ourselves some short-term goals of where we wanted to be by Monday morning and went away individually with our tasks, pushing to GitHub regularly. 

* Theo wanted to complete the majority of the backend. With the focus more on the Sprint side as opposed to Marathon. 
* I wanted to complete the routing of the frontend, with basic display of data and sort functionality on the Sprint page. 
* Tomas wanted to complete the Home page, Login and Register pages with styling. 
* Collectively, if we had time to spare, we also wanted to add movie data to our seed file.

With the above in mind, our aim was to reconvene on Monday morning, meet and discuss how we all did with our tasks over Slack and Zoom to see where we were as a team. If all was well, we wanted to move on and set some more short term goals that we each wanted to tackle. 

## Beginning Backend & Data

Theo took on the backend after we collectively established what schema we wanted from our movie data. After exploring the [OMDB API](http://www.omdbapi.com/), we found that the most efficient way of data entry would be to copy the API and paste it into our seed data.
As of which we went for the below movieSchema:

```javascript
const movieSchema = new mongoose.Schema({
 title: { type: String, required: true, unique: true, trim: true },
 year: { type: String, required: true },
 rated: { type: String, required: true },
 released: { type: String, required: true },
 actors: { type: String, required: true },
 runtime: { type: Number, required: true },
 genre: { type: String, required: true },
 director: { type: String, required: true },
 writer: { type: String, required: true },
 plot: { type: String, maxlength: 500, trim: true },
 poster: { type: String, required: true },
 language: { type: String, required: false },
 country: { type: String, required: false },
 awards: { type: String, required: false },
 metascore: { type: Number, required: false },
 imdbrating: { type: Number, required: false },
 comments: [commentSchema],
})
````

For the sake of our application, we started the data entry by focusing more on sequels, trilogies and Top 100 films (based on IMDB). In order for the website to be useful regarding sought after marathons. 

## Beginning Frontend

Before the basic Backend and data was created, Tomas and I started on the Frontend components that were not reliant on the Backend and data. 
Completing the basic Homepage, Login and Register pages.

Upon completion of the above and Theo completing the basic backend, Tomas moved onto some data entry whilst I moved on to creating the Sprint page. I started by understanding that in order to make the application better, the sort needed to not only be on time and genre, but time and multiple genres. As the user would find this more useful. 

To do this, I imported React Select, hardcoded the genre options and created a handleGenreChange function to map out the data based on genre.

**Function**
```javascript
 const handleGenreChange = (selected, name) => {
   const selectedGenres = selected ? selected.map(item => item.value) : []
   setFormData({ ...formData, [name]: selectedGenres })
   setGenreValue(selectedGenres)
 }
```

**JSX**

```javascript
                   <Select
                     options={genreOptions}
                     isMulti
                     onChange={selected =>
                     handleGenreChange(selected, 'genres')
                     }
value={formData.genres.map(item => ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
                   />
```

Upon this working successfully for genres, I moved on to replicating it and adding the run time as a sort option…

This is where I came across my first hurdle. When implementing my filter function for both genre and time, I realised that I could only filter one genre at a time, using .includes(). After being stuck on this for some time I felt I needed to move on, so I hard-coded the first three genres as separate functions, mapping them out separately in the JSX. 

**Functions**

```javascript
const filterGenresOne = () => {
   if (genreValue) {
     return movies.filter(movie => {
       return movie.genre.includes(genreValue[0]) && movie.runtime < runTimeValue
     })
   }
 }
 const filterGenresTwo = () => {
   if (genreValue) {
     return movies.filter(movie => {
       return movie.genre.includes(genreValue[1]) && movie.runtime < runTimeValue
     })
   }
 }
 const filterGenresThree = () => {
   if (genreValue) {
     return movies.filter(movie => {
       return movie.genre.includes(genreValue[2]) && movie.runtime < runTimeValue
     })
   }
 }
 
```

**JSX**

```javascript
       <div className="topten-movies uk-container-large">
         <div className="movie uk-grid uk-grid-medium uk-width-1-1">
           {genreValue &&
         movies &&
         filterGenresOne().map(movie =>
           <>
             <div
               className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
               <div className="movie-cards">
                 <img className="showing" src={movie.poster}/>
                 <div className="hiding uk-button-group">
                   <Link to={`/movies/${movie._id}`} key={movie._id}>
                     <button className="uk-button uk-button-secondary uk-button-small">
                   Watch Now
                     </button>
                   </Link>
                 </div>
               </div>
             </div>
           </>
         )}
           {genreValue &&
             movies &&
             filterGenresTwo().map(movie =>
               <>
                 <div
                   className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                   <div className="movie-cards">
                     <img className="showing" src={movie.poster}/>
                     <div className="hiding uk-button-group">
                       <Link to={`/movies/${movie._id}`} key={movie._id}>
                         <button className="uk-button uk-button-secondary uk-button-small">
                       Watch Now
                         </button>
                       </Link>
                      
                     </div>
                   </div>
                 </div>
               </>
             )}
           {genreValue &&
           movies &&
           filterGenresThree().map(movie =>
             <>
               <div
                 className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                 <div className="movie-cards">
                   <img className="showing" src={movie.poster}/>
                   <div className="hiding uk-button-group">
                     <Link to={`/movies/${movie._id}`} key={movie._id}>
                       <button className="uk-button uk-button-secondary uk-button-small">
                     Watch Now
                       </button>
                     </Link>
                    
                   </div>
                 </div>
               </div>
             </>
           )}
         </div>
       </div>
```

Doing so allowed me to move on from this problem and start on the rest of the application, with the aim of coming back to it if there is time available. 


## Next Plan Of Action

Monday morning we met up and discussed where we all were as a team and were happy that we were on schedule. Understanding that the marathon functionality was going to be the hardest part of the application, Theo and I moved on to this segment together, leaving Tomas to tackle the Movie Profile page. 

The Marathon page in itself, was fairly straightforward, as the majority of it was replicating the Sprint page. So we managed to complete this fairly quickly. The problem for us was figuring out how a User can log all their movie selections and create a Marathon. I came up with a solution, in that we created an additional page as a form, passing the data from the previous Marathon page and having the user submit this along with their created marathon name. 

We did this by doing the below and hiding part of the form to the user. This information was passing through the title and poster of each film that the user added to their marathon. 

However, we encountered another problem, which was that the data was passing through the form with integers that were numbers, which cannot be mapped out. Example below. 
```javascript
         {marathons && marathons.map(marathon => {
           {marathon.0}
```

We could not quite solve this mystery as to why the data was being passed through this way, even with the help from two teacher assistants!

As of which, we had to resort to hard-coding these values when mapped out on their Marathon Profile page and Marathons page. Not ideal, however we needed a solution quickly given the timeframe and felt we could come back to this issue later if we have time to spare. 

For example, on the Marathon Profile Page we had to resort to the below code, capping the amount of movies allowed on a Marathon to 5. 

**JSX***

```javascript
<h2><strong>{marathon.name}</strong></h2>
             <p><strong>Movies:</strong><br></br>{marathon[1]}<br></br>{marathon[3]}<br></br>{marathon[5]}<br></br>{marathon[7]}<br></br>{marathon[9]}<br></br>{marathon[11]}</p>

```

As per the above examples, we did manage to accomplish functionality for the Marathon Profile Page and Marathons Page.

## Finishing Touches

* With only a day or so to spare given the issues faced, we felt we needed to come together and all style the project.
* With our favourite Bulma framework banned from the project, we researched and chose Material UI as our framework. 
* We met collectively via Zoom and Slack in the morning and delegated out our styling tasks, whilst also creating and styling user profile pages and the Navbar. 
* We also came up with the idea of creating an additional splash page, which directed the users to either head to the Sprint or Marathon pages, creating a better flow for the user. 

## Unsolved Problems

* As mentioned previously, ideally we would love for cleaner code with the Marathons side of the application.
* Our chosen background image of all the pages does clash a bit with a lot of the application, sometimes it also changes in size.
* Adding more marathon data and movie data.
* I would have liked for all the choices of movies to be presented on the page instead of empty, before making your choice of minutes and genres. 

## Challenges

The challenges definitely came with the Marathons page and how it all worked. For something that we felt was doable had its setbacks, especially coming across the mapping issue which was something I did not anticipate and still cannot quite understand!

This was also my first time working with Git as a member of a team so we had some problems with getting used to checking out and merging feature branches. Good communication was key to avoid major merge conflicts.

## Wins

It was very beneficial working as part of a wider team, especially as we all had our specific skill sets that worked in our favour and allowed us to disperse and work separately on different parts of the application. I also thought that the idea of the application was very useful and it is crazy to think that we can now build something like this with our new set of skills. 

##Features Wish List

* More User functionality, with user commenting and rating of Marathons and Movies. 
* More data added to User Profile pages.
* We did movies only as we ran out of time...ideally adding TV shows to the Sprint component would give the application better functionality….even adding a sort feature so users can differentiate between TV Show or Movie. 

## Key Learnings

This project was definitely the most challenging up to date, bringing together everything we had learnt on the course so far. The project made me learn the importance of thorough planning, communication as a team and taking ownership of each individual's respective area of responsibility. From a technical view, I understood that working with a data set that created another proved to be not as easy as it seemed.

