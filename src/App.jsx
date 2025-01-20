import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const articles = [
  { id: 1, title: "Firenze: il gatto della vecchietta conquista il cuore di tutti al mercato" },
  { id: 2, title: "Bologna: il panino più lungo del mondo sfornato in una trattoria" },
  { id: 3, title: "Venezia: il gondoliere canta per l'orso polare in visita al Carnevale" }
];

function App() {
  const [articlesList, setArticlesList] = useState(articles);
  const [newArticle, setNewArticle] = useState({ title: '' });

  const handlerSubmit = (e) => {
    e.preventDefault();
    setArticlesList([...articlesList, newArticle]);
    setNewArticle({ title: '' });
  };

  const handlerNewArticle = (e) => {
    const updatedArticle = {
      id: Date.now(),
      title: e.target.value
    };
    setNewArticle(updatedArticle);
  };

  const handlerRemoveArticle = (id) => {
    const removeArt = articlesList.filter(art => art.id !== id);
    setArticlesList(removeArt);
  };

  return (
    <div className="bg-dark py-5">
      <section className="container">
        <h1 className="text-info">Aggiungi un articolo</h1>

        {/* Aggiungi titolo */}
        <form action="#" className="d-flex" onSubmit={handlerSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Scrivi il titolo dell'articolo"
            value={newArticle.title}
            onChange={handlerNewArticle}
          />
          <button type="submit" className="btn btn-info text-white mx-3">Aggiungi</button>
        </form>

        {/* Lista articoli */}
        <ul className="list-group my-3">
          {articlesList.map(art => (
            <li
              key={art.id}
              className="list-group-item d-flex justify-content-between align-items-center">
              {art.title}
              <div>
                <i
                  className="mx-3"
                  onClick={() => handlerRemoveArticle(art.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} color="grey" />
                </i>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
