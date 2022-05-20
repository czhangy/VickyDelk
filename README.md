<div align="center">

<!-- Title -->

<h1>Vicky Delk's Blog</h1>

<!-- Badges -->

<p>
    <a href="https://github.com/czhangy/vickydelk/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/czhangy/vickydelk" alt="contributors" />
    </a>
    <a href="">
        <img src="https://img.shields.io/github/last-commit/czhangy/vickydelk" alt="last update" />
    </a>
    <a href="https://github.com/czhangy/vickydelk/network/members">
        <img src="https://img.shields.io/github/forks/czhangy/vickydelk" alt="forks" />
    </a>
    <a href="https://github.com/czhangy/vickydelk/stargazers">
        <img src="https://img.shields.io/github/stars/czhangy/vickydelk" alt="stars" />
    </a>
    <a href="https://github.com/czhangy/vickydelk/issues/">
        <img src="https://img.shields.io/github/issues/czhangy/vickydelk" alt="open issues" />
</p>
<h4>
    <a href="https://github.com/czhangy/vickydelk">Documentation</a>
    <span> · </span>
    <a href="https://github.com/czhangy/vickydelk/issues/">Report Bug</a>
</h4>

</div>

<br />

<!-- Table of Contents -->

# Table of Contents

-   [About the Project](#about-the-project)
    -   [Tech Stack](#tech-stack)
    -   [Features](#features)
    -   [Color Reference](#color-reference)
    -   [Environment Variables](#environment-variables)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Run Locally](#run-locally)
-   [Usage](#usage)
-   [Roadmap](#roadmap)
-   [License](#license)
-   [Contact](#contact)
-   [Acknowledgements](#acknowledgements)

<!-- About the Project -->

## About the Project

<!-- Tech Stack -->

### Tech Stack

<details>
    <summary>Client</summary>
    <br />
    <a href="https://reactjs.org/">
        <img src="https://img.shields.io/badge/reactjs-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="ReactJS" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://img.shields.io/badge/NextJS-black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextJS" />
    </a>
    <a href="https://sass-lang.com/">
        <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" />
    </a>
</details>

<details>
    <summary>Server</summary>
    <br />
    <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/NextJS-black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextJS" />
    </a>
</details>

<details>
    <summary>Database</summary>
    <br />
    <a href="https://www.mongodb.com/">
        <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
</details>

<details>
    <summary>Deployment</summary>
    <br />
    <a href="https://www.vercel.com/">
        <img src="https://img.shields.io/badge/-vercel-black?logo=vercel&logoColor=white&style=for-the-badge" alt="Vercel" />
    </a>
</details>

<!-- Color Reference -->

### Color Reference

| Color        | Hex     |
| ------------ | ------- |
| Accent Color | #FFB6B7 |
| Text Color   | #000000 |

<!-- Env Variables -->

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`MONGODB_URI`

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

This project uses NPM as a package manager

<!-- Run Locally -->

### Run Locally

Clone the project

```bash
  git clone https://github.com/czhangy/vickydelk.git
```

Install dependencies

```bash
  npm install
```

Start the application

```bash
  npm run start
```

<!-- Roadmap -->

## Roadmap

-   [ ] Build out and test nav components

    -   [x] Navbar with router links
    -   [x] Footer
    -   [ ] Nav menu for mobile displays

-   [x] Build Home Page

    -   [x] Profile photo
    -   [x] Recent posts section to display the most recent 3 posts

-   [ ] Build Blog Page

    -   [x] Blog post cards to link to individual blog posts
    -   [ ] Pagination (5 card max per page)
    -   [ ] Sort
    -   [ ] Filters (by post categories)

-   [ ] Build Post API

    -   [x] Fetching for list of posts + individual posts
    -   [x] Posting to MongoDB
    -   [ ] Updating existing posts
    -   [ ] Deleting existing posts

-   [ ] Build Post Page

    -   [x] Form that submits to MongoDB
    -   [x] Protected delete button that clears the form
    -   [ ] Add button that adds either an image or a paragraph
    -   [x] Skeleton system to interweave images and paragraphs
    -   [ ] Image uploading and display
    -   [ ] Protected by auth
    -   [ ] Element-specific delete buttons
    -   [ ] Redirect on submit
    -   [ ] Error on failed submit

-   [ ] Build About Page
-   [ ] Build Resume Page

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- Contact -->

## Contact

#### Victoria Delk:

<a href="https://www.linkedin.com/in/victoriadelk/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>

<br />

#### Charles Zhang:

<a href="https://www.linkedin.com/in/charles-zhang-14746519b/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://twitter.com/czhangy_">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
</a>
<a href="https://czhangy.io">
    <img src="https://img.shields.io/badge/-personal%20site-darkgrey?logo=code-review&logoColor=white&style=for-the-badge" alt="Personal Site" />
</a>

<!-- Acknowledgments -->

## Acknowledgements

-   [Awesome README](https://github.com/matiassingers/awesome-readme)
-   [Google Fonts](https://fonts.google.com/)
-   [Shields.io](https://shields.io/)
