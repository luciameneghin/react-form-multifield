import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { image } from "fontawesome";

const articles = [
  {
    id: 1,
    title: "Firenze: il gatto della vecchietta conquista il cuore di tutti al mercato",
    image: "https://images2.corriereobjects.it/methode_image/2018/03/07/Scienze/Foto%20Gallery/2018_03_Meet_Cutest_Fish_Vendor_Vietnam-004_MGZOOM.jpg",
    content: "Il gatto della vecchietta è diventato una celebrità al mercato di Firenze, dove tutti lo amano...",
    category: "Animali",
    tags: ["gatto", "mercato", "Firenze"],
    published: true
  },
  {
    id: 2,
    title: "Bologna: il panino più lungo del mondo sfornato in una trattoria",
    image: "https://www.puntarellarossa.it/wp/wp-content/uploads/2013/10/panino-vegano.jpg",
    content: "Una trattoria bolognese ha appena sfornato il panino più lungo del mondo, superando ogni record...",
    category: "Cucina",
    tags: ["panino", "Bologna", "record"],
    published: false
  },
  {
    id: 3,
    title: "Venezia: il gondoliere canta per l'orso polare in visita al Carnevale",
    image: "https://www.vivovenetia.it/wp-content/uploads/2019/03/KIDS-gondola.jpg",
    content: "Durante il Carnevale di Venezia, un gondoliere ha emozionato il pubblico cantando per l'orso polare in visita...",
    category: "Eventi",
    tags: ["gondoliere", "Venezia", "Carnevale", "orso polare"],
    published: true
  }
];


function App() {
  const defaultFormData = {
    title: '',
    image: '',
    content: '',
    category: '',
    tags: '',
    published: false
  }

  const [formData, setFormData] = useState(defaultFormData)
  const [articlesList, setArticlesList] = useState(articles);


  const handlerSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: Date.now(),
      ...formData
    };
    setArticlesList([...articlesList, newArticle]);
    setFormData(defaultFormData);
  };

  const handlerChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }


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
              value={formData.title}
              onChange={handlerChange}
            />
          </div>

          {/* immagine */}
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

          {/* Contenuto */}
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
            >
              {/* {articles.map(art => {
              <option key={art.id} value={art.articlesList}>{art.category}</option> */}
              <option value="">Seleziona una categoria</option>
              <option value="Animali">Animali</option>
              <option value="Cucina">Cucina</option>
              <option value="Eventi">Eventi</option>
              )
            </select>
          </div>

          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="col-3">Aggiungi dei tags</h5>
            <input
              type="text"
              name='tags'
              className="form-control"
              value={formData.tags}
              placeholder="Es. tag1, tag2"
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
              <div className="my-3">
                <h5>{art.title}</h5>
                {art.image && <img src={art.image} width='500' className="mx-auto d-block my-3" />}
                <p>Categoria: {art.category}</p>
                <p>Contenuto dell'articolo:<br />{art.content}</p>
                <p>Tags: {art.tags}</p>
              </div>
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
