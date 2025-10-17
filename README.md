<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="frontend/src/assets/bar-logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Bar Assistant Application</h3>

  <p align="center">
    This full-stack application is designed to simplify the process of booking tables at your favorite establishment. Once your profile is created, all relevant information is securely stored, allowing you to reserve a table with just a single click.
    <br />
    <a href="https://github.com/toro-m/bar-assistant.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/toro-m/bar-assistant.git">View Demo</a>
    &middot;
    <a href="https://github.com/toro-m/bar-assistant/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/toro-m/bar-assistant/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
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
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]

With this project, we set out to turn the age-old hassle of booking a table into an effortless experience—for both guests and staff. Instead of calling during opening hours and hoping someone is available to answer (which can be especially challenging for smaller venues), users can simply select their desired time and confirm their booking details online.
For us, this project was a perfect opportunity to dive into user management and security, work with SQL databases using Spring Data JPA, and create a clean, user-friendly interface with React.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

#### Frontend
* [![React][React.js]][React-url] 
* [![Vite][Vite.js]][Vite-url] 
* [![MUI][MUI.js]][MUI-url] 

#### Backend
* [![Spring Boot][Spring-Boot.js]][Spring-Boot-url]
* [![Spring Security][Spring-Security.js]][Spring-Security-url] 
* [![Spring Data JPA][Spring-Data-JPA.js]][Spring-Data-JPA-url]
* [![Java][Java.js]][Java-url] 
* [![PostgreSQL][PostgreSQL.js]][PostgreSQL-url] 

#### DevOps
* [![Docker][Docker.js]][Docker-url]
* [![Docker Compose][Docker-Compose.js]][Docker-Compose-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/) (v20.10.0 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0.0 or higher)
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [Git](https://git-scm.com/downloads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/toro-m/bar-assistant.git
   cd bar-assistant
   ```

2. **Set up environment variables**
    - Copy the `.env.template` file and rename it to `.env`
    - Update the values in `.env` with your configuration:
      ```
      DB_USERNAME=postgres
      DB_PASSWORD=your_secure_password
      DB_URL=jdbc:postgresql://postgres:5432/bar_assistant
      SECRET_KEY_JWT=your_secure_jwt_secret
      JWT_EXPIRATION_MS=86400000  # 24 hours in milliseconds
      ```

3. **Start the application**
    - Using Docker Compose (recommended):
      ```bash
      docker-compose up --build
      ```
    - The application will be available at:
        - Frontend: http://localhost:5173
        - Backend API: http://localhost:8080
        - PostgreSQL: localhost:5432

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: app-screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[MUI.js]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[React-Router.js]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/
[Framer-Motion.js]: https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white
[Framer-Motion-url]: https://www.framer.com/motion/
[Date-fns.js]: https://img.shields.io/badge/date--fns-007AFF?style=for-the-badge
[Date-fns-url]: https://date-fns.org/
[Spring-Boot.js]: https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-Boot-url]: https://spring.io/projects/spring-boot
[Spring-Security.js]: https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white
[Spring-Security-url]: https://spring.io/projects/spring-security
[Spring-Data-JPA.js]: https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-Data-JPA-url]: https://spring.io/projects/spring-data-jpa
[Java.js]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.oracle.com/java/
[PostgreSQL.js]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Docker.js]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Docker-Compose.js]: https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-Compose-url]: https://docs.docker.com/compose/
