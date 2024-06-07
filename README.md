<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="frontEnd/src/assets/mercadit-app-logo.png" alt="Logo" width="150" height="150">


  </a>

  <h3 align="center">MercaditApp</h3>

  <p align="center">
    A web platform where sellers list products and customers arrange face-to-face transactions. 
    <br />
    <a href="https://github.com/Intelligent-Escapists/MercaditApp/blob/main/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#usage">View Demo</a>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/f3b17268-89ef-4cd2-bdfc-4e176360a356)


This project is a web platform that connects sellers and customers for face-to-face transactions. Sellers can list their products, and customers can browse these listings to find what they need. Once a customer finds a product they are interested in, they can contact the seller through the platform to arrange a meeting at a convenient location to complete the sale.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![React][React.js]][React-url]
* [![Tailwindcss][TailwindCSS]][TailwindCSS-url]
* [![Shadcnui][Shadcn]][Shadcn-url]
* [![Flask-py][Flask]][Flask-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites
Ensure you have Node.js and npm installed before setting up the project.

* Install Node.js in the LTS 
  ```sh
  https://nodejs.org/en
  ```
* If you have Node already istalled, ensure you have at least node 20.12.2
   ```sh
    $ node -v
    v20.12.2
    ```
* Install the latest npm package manager
    ```sh
    npm install npm@latest -g
    ```
* If you have already installed a npm version, make sure you have at least npm 10.5.0
  ``` sh
  $ npm -v
  10.5.0
  ```
* Install python packages
  ```sh
  pip install -r requirements.txt
  ```

### Installation

_For setting up the project you need to install the npm packages used in the project. Also, need to initiate the API._

1. Clone the repo
   - Via https:
     ```sh
     git clone https://github.com/Intelligent-Escapists/MercaditApp.git
     ```
   - Via SSH:
     ```sh
     git clone git@github.com:Intelligent-Escapists/MercaditApp.git
     ```
3. Install NPM packages
   ```sh
   $ cd frontEnd
   $ npm install
   ```
4. Create a .env in the backEnd folder
   ```sh
   $ cd backEnd
   $ touch .env
   ```
   - Add this code in your .env file
   ```python
   SECRET_KEY=xdPgBNqIe4
   MAIL_USERNAME=mercaditapp@gmail.com
   MAIL_PASSWORD=jvhj fmvp azqh gepu
   MYSQL_USER=root
   MYSQL_PASSWORD=HtBHMhiqUJzflyrEdONAOzzgeqKPzPDk
   MYSQL_HOST=roundhouse.proxy.rlwy.net
   MYSQL_DATABASE=railway
   MYSQL_PORT=16748
   ```
4. Initiate flask API
   ```sh
   $ cd backEnd
   $ python app.py
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_In this proyect, we have two posible users: Customers and Sellers_

* As Sellers, you can:
  - Add new product to the store
   
    ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/d629b1d3-5ad3-40b8-85f8-9247a2816f9d)
  - Manage their products
    ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/ca1e6b4e-d204-44b1-90a9-55264fb7b7b3)
    
    ![video Demo](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/82753b78-1590-4291-b314-55b77263f4c6)

* As Customers, you can:
  - See all the available products
   
    ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/914d5af9-e1b7-48f4-9f46-b64cdf6464b1)
  - See poduct details: price,rate a product, avarage rating product, put a comment for the product, see seller's info.
   
    ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/959e3bfc-a375-4002-986d-68f007f748c1)
    ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/325b5b28-73a9-460a-ab79-9956443bf7ae)
  - Search for a especific product by name
   
    ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/12fb873f-e062-4b4d-b4c5-44eda8688a19)


* For ALL Users, the can:
  - Login with an existing account
      
      ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/940e5849-9cb5-41e1-8df0-ef910d1caa7a)

      
    - Register as Seller os Customer if you are a new user
      
      ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/4a2654c3-9ba2-4a64-95e9-2b2f9127fa91)

    - Edit profile info
      
      ![image](https://github.com/Intelligent-Escapists/MercaditApp/assets/88741499/ed0e50b4-73c2-449d-9426-111f8c066980)


  

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Intelligent-Escapists/MercaditApp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwndcss-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=%2306B6D4
[TailwindCSS-url]: https://tailwindcss.com/
[Flask]: https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=%23ffffff
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[Shadcn]: https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui&logoColor=%ffffff
[Shadcn-url]: https://ui.shadcn.com/
