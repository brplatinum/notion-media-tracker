<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/brplatinum/notion-media-tracker">
    <img src="images/logo.png" alt="Logo" height="80">
  </a>

  <h3 align="center">Notion Media Tracker</h3>

  <p align="center">
    Easily track what you watch and read inside of Notion!
    <br />
    <a href="https://humorous-mahogany-42a.notion.site/Notion-Media-Tracker-Demo-e4c45cee37cf4295995802dace523b5d"><strong>Check out the demo!</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#future">Future</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="images/screenshot1.png" alt="Logo" width="800">
<img src="images/screenshot2.png" alt="Logo" width="800">
<img src="images/screenshot3.png" alt="Logo" width="800">

If you're like me and like to keep track of things you want to watch and read in the future or remember what you've already seen then this is for you. No more manually entering every piece of metadata for a that film you watched on the weekend or trying to remember the ISBN for the book you read on holiday last year. Just quickly search for the media property you want and add to your Notion database and click the button resembling what status you want to give the piece of media you're adding.

Main functionality:

- Search for books, movies and TV shows using the embedded web app inside your Notion page
- Add a piece of media to your Notion database by clicking 'Add to shelf' - this will give it the 'Backlog' status
- Add a piece of media to the 'Up next' section of your database with 'Read Next'
- Add and review a finished piece of media by clicking 'Finished' and then choosing a star rating out of 10
- Add a piece of media you're currently reading with 'Currently reading'
- Media metadata will be added to the Notion database upon your selection. Metadata such as cover art, author/director/showrunner, genres, year released and media type

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Express][Express]][Express-url]
- [![Mantine][Mantine]][Mantine-url]
- [![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)

OR

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Docker image available [here](https://hub.docker.com/r/brplatinum/notion-media-tracker).

OR

Build and deploy yourself:

1. Clone the repo
   ```sh
   git clone https://github.com/brplatinum/notion-media-tracker
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API keys in `config/keyfile.json`
   ```json
   {
     "notionIntegrationToken": "secret_EFdZlAm...", // Notion API integration token - https://www.notion.so/help/create-integrations-with-the-notion-api
     "notionDatabaseId": "3d0b1bf22a9540...", // Notion database ID for the database where you want to save the data - https://stackoverflow.com/questions/67728038/where-to-find-database-id-for-my-database-in-notion
     "tmdbToken": "eyJhbGciOiJIUz..." // TMDB API token - https://developer.themoviedb.org/reference/intro/authentication#api-key-quick-start
   }
   ```
4. Build
   ```sh
   npm run build
   ```
5. Start service
   ```sh
   npm start
   ```
6. Embed the web page (located at localhost:3000 if running locally) in the Notion page you want to track your media from

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Future

- [ ] Add manga and comic books as media types
- [ ] Add music as a media type
- [ ] Add video games as media types
- [ ] Provide duplicatable Notion page so you don't have to create your own
- [ ] Improve robustness of self-hosting features

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express]: https://img.shields.io/badge/Express-262626?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com/
[Mantine]: https://img.shields.io/badge/Mantine-339af0?style=for-the-badge&logo=mantineui
[Mantine-url]: https://mantine.dev/
[Docker]: https://img.shields.io/badge/Docker-339af0?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
