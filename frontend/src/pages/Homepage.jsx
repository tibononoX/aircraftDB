import Header from "@components/Header";
import "@styles/Homepage.scss";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="page">
      <Header />
      <section className="home-content">
        <header className="info-header">
          <div className="server-info">
            <h2>24 aircrafts on the database</h2>
            <h2>13 users registered</h2>
          </div>
          <div className="project-desc">
            <h2>About the project</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
              neque quae minima, facilis incidunt ex necessitatibus, dignissimos
              modi blanditiis perspiciatis accusamus tempora nihil vitae.
              Blanditiis est corporis sequi dicta deleniti. Distinctio quasi at,
              pariatur nostrum aperiam ut voluptate excepturi laudantium
              corrupti veritatis sit id reiciendis dignissimos. Atque placeat
              quibusdam voluptatum consequuntur quos ab quia enim veritatis
              eius, autem adipisci error! Cum iusto officiis architecto, maxime
              harum fuga odit assumenda corporis, esse, ipsam dicta. Quasi
              delectus, nesciunt cupiditate maiores odio quidem laudantium
              sapiente voluptatibus aperiam molestiae quaerat veniam deleniti
              incidunt et.
            </p>
          </div>
        </header>
        <div className="browse-buttons">
          <NavLink className="button" to="/catalog">
            BROWSE AIRCRAFT LIST
          </NavLink>
          <NavLink to="/catalog">I'd rather get surprised!</NavLink>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
