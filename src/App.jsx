import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

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

const categories = [
  'Fai da te',
  'Animali',
  'Cucina',
  'Eventi',
  'Tecnologia'
]

const tagsObj = [
  { id: 1, item: "Gatto" },
  { id: 2, item: "Mercato" },
  { id: 3, item: "Firenze" },
  { id: 4, item: "Panino" },
  { id: 5, item: "Bologna" },
  { id: 6, item: "Gondoliere" },
  { id: 7, item: "Venezia" },
  { id: 8, item: "Carnevale" },
  { id: 9, item: "Orso polare" }
];


function App() {
  const defaultFormData = {
    title: '',
    image: '',
    content: '',
    category: '',
    tags: [],
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


    if (type === 'text' || type === 'textarea') {
      setFormData({
        ...formData,
        [name]: value
      })
    }

    //prendo l'index della select che mi interessa
    // if (name === 'category') {
    //   [value] = categories[name]
    // }
    if (name === 'category') {
      setFormData({
        ...formData,
        category: value
      })
    }

    //checkbox tag
    if (type === 'checkbox' && name === 'tags') {
      setFormData({
        ...formData,
        tags: checked
          ? [...formData.tags, value]  //aggiungo
          : formData.tags.filter(tag => tag !== value)  //rimuovo
      });
    }

    //checkbox draft/published
    if (type === 'checkbox' && name === 'published') {
      setFormData({
        ...formData,
        published: checked //valore booleano in automatico
      })
    }
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
            <h5 className="text-white col-3">Seleziona la categoria in cui rientra l'articolo</h5>
            <select
              name='category'
              className="form-select"
              value={formData.category}
              onChange={handlerChange}
            >
              <option value="">Seleziona una categoria</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>


          {/* tags */}
          <div className="form-group d-flex my-3 text-white my-2">
            <h5 className="col-3">Aggiungi dei tags</h5>
            <ul>
              {tagsObj.map(tag => (
                <li key={tag.id} className='form-check'>
                  <input
                    type='checkbox'
                    name='tags'
                    value={tag.item}
                    checked={formData.tags.includes(tag.item)}
                    onChange={handlerChange}
                    className='form-check-input'
                  />
                  <label className="text-light">{tag.item}</label>
                </li>
              ))}
            </ul>
          </div>

          {/*pubblicazione */}
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
            <span htmlFor="published">Published</span>
          </div>

          {/* bottone */}
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
              <div className="my-3 mx-3">
                <h5>{art.title}</h5>
                <span className={`badge ${art.published ? 'bg-info' : 'bg-warning'} text-light`}>
                  {art.published ? 'Published' : 'Draft'}
                </span>
                {art.image && <img src={art.image} width='250' className="mx-auto d-block my-3" />}
                <p>Categoria: {art.category}</p>
                <p>Contenuto dell'articolo:<br />{art.content}</p>
                <p>Tags: {Array.isArray(art.tags) ? art.tags.join(', ') : ''}</p>

              </div>
              <div>
                <i className="mx-3 fs-3"
                  onClick={() => handlerRemoveArticle(art.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                </i>
              </div>
            </li>
          ))}
        </ul>
      </section >
    </div >
  );
}

export default App;
