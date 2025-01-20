import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const articles = [
  {
    id: 1,
    title: "Firenze: il gatto della vecchietta conquista il cuore di tutti al mercato",
    image: "url-to-image-1.jpg",
    content: "Il gatto della vecchietta è diventato una celebrità al mercato di Firenze, dove tutti lo amano...",
    category: "Animali",
    tags: ["gatto", "mercato", "Firenze"],
    published: true
  },
  {
    id: 2,
    title: "Bologna: il panino più lungo del mondo sfornato in una trattoria",
    image: "url-to-image-2.jpg",
    content: "Una trattoria bolognese ha appena sfornato il panino più lungo del mondo, superando ogni record...",
    category: "Cucina",
    tags: ["panino", "Bologna", "record"],
    published: false
  },
  {
    id: 3,
    title: "Venezia: il gondoliere canta per l'orso polare in visita al Carnevale",
    image: "url-to-image-3.jpg",
    content: "Durante il Carnevale di Venezia, un gondoliere ha emozionato il pubblico cantando per l'orso polare in visita...",
    category: "Eventi",
    tags: ["gondoliere", "Venezia", "Carnevale", "orso polare"],
    published: true
  }
];


function App() {
  const defaultFormData = {
    title: '',
    image: null,
    content: '',
    category: '',
    tags: [],
    published: false
  }

  const [formData, setFormData] = useState(defaultFormData)
  const [articlesList, setArticlesList] = useState(articles);
  const [newArticle, setNewArticle] = useState({ title: '' });

  const handlerSubmit = (e) => {
    e.preventDefault();
    setArticlesList([...articlesList, newArticle]);
    setNewArticle({ title: '' });
  };

  const handlerChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [name]: value
    })
  }
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

        {/* Aggiungi titolo... aggiunte all'articolo(img, content, ...) */}
        <form action="#" onSubmit={handlerSubmit} className="row-cols">
          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="text-white col-3">Scrivi il titolo del nuovo articolo</h5>
            <input
              type="text"
              name='title'
              className="form-control"
              placeholder="Scrivi il titolo dell'articolo"
              value={newArticle.title}
              onChange={handlerNewArticle}
            />
          </div>

          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="text-white col-3">Inserisci URL immagine</h5>
            <input
              type="text"
              name='image'
              className="form-control"
              value={formData.image}
              placeholder="url immagine"
              onChange={handlerChange}
            />
          </div>

          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="text-white col-3">Scrivi il contenuto dell'articolo</h5>
            <textarea
              type="text"
              name='content'
              className="form-control"
              value={formData.content}
              placeholder="content"
              onChange={handlerChange}
            />
          </div>

          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="text-white col-3">Scrivi le categorie in cui rientra l'articolo</h5>
            <select
              name='category'
              className="form-select"
              value={formData.category}
              placeholder="category"
              onChange={handlerChange}
            />
            <option value="">Seleziona una categoria</option>
            <option value="animali">Animali</option>
          </div>

          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="col-3">Aggiungi dei tags</h5>
            <input
              type="text"
              name='tags'
              className="form-control"
              value={formData.tags}
              placeholder="tags"
              onChange={handlerChange}
            />
          </div>

          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="col-3">Pubblicazione</h5>
            <input
              type="checkbox"
              name='published'
              className="form-check-input me-2"
              value={formData.published}
              placeholder="published"
              onChange={handlerChange}
            />
            <label htmlFor="published" className="me-5">Draft</label>
            <input
              type="checkbox"
              name='published'
              className="form-check-input me-2"
              value={formData.published}
              placeholder="published"
              onChange={handlerChange}
            />
            <label htmlFor="published">Published</label>
          </div>

          <div className="text-center py-3">
            <button type="submit" className="btn btn-info text-white col-3 justify-content-center">Aggiungi</button>
          </div>
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
