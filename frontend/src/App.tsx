const releases = [
  {
    title: 'Blue Hour',
    artist: 'Mira Vale',
    price: '$18.00',
    image: 'https://picsum.photos/seed/musiccorner-blue-hour/800/920',
    alt: 'Illustrative blue-toned album photography for Blue Hour',
    tone: 'blue',
  },
  {
    title: 'Soft Signals',
    artist: 'The Paper Satellites',
    price: '$21.00',
    image: 'https://picsum.photos/seed/musiccorner-soft-signals/800/920',
    alt: 'Illustrative warm-toned album photography for Soft Signals',
    tone: 'rose',
  },
  {
    title: 'Night Bloom',
    artist: 'June Arcade',
    price: '$16.00',
    image: 'https://picsum.photos/seed/musiccorner-night-bloom/800/920',
    alt: 'Illustrative dark floral album photography for Night Bloom',
    tone: 'green',
  },
];

/** Render the Music Corner sample storefront. */
export default function App() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Music Corner home">
          <span className="wordmark-mark" aria-hidden="true">M</span>
          <span>music corner</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#collection">The collection</a>
          <a href="#visit">Find us</a>
        </nav>
        <a className="header-note" href="#newsletter">A note from us <span aria-hidden="true">↗</span></a>
      </header>

      <main>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker"><span className="sound-mark" aria-hidden="true">♪</span> A little record shop for everyone</p>
          <h1 id="hero-title">Welcome to <span>Music Corner.</span></h1>
          <p className="hero-description">A small collection of records for the songs that stay with you.</p>
          <a className="primary-link" href="#collection">Explore CDs <span aria-hidden="true">↘</span></a>
          <p className="demo-note">A sample storefront. Details and releases are for demonstration.</p>
        </div>
        <div className="hero-art" aria-label="Illustrative photograph of a person browsing records">
          <img
            src="https://picsum.photos/seed/musiccorner-recordshop/1100/950"
            alt="Warm, illustrative record-shop scene"
          />
          <div className="art-caption"><span>Find a sound</span><span>Make it yours</span></div>
          <span className="art-stamp" aria-hidden="true">MC<br />FM</span>
        </div>
        <div className="hero-footer" aria-hidden="true">
          <span>Independent listening</span>
          <span className="hero-footer-line" />
          <span>Always in rotation</span>
        </div>
      </section>

      <section className="collection section-wrap" id="collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">The listening shelf</p>
            <h2 id="collection-title">Three to start with.</h2>
          </div>
          <p className="section-description">A few made-up favorites, picked for the way they make a room feel.</p>
        </div>
        <div className="release-grid">
          {releases.map((release, index) => (
            <article className={`release-card release-${release.tone}`} key={release.title}>
              <div className="release-image-wrap">
                <img src={release.image} alt={release.alt} loading="lazy" />
                <span className="release-index">0{index + 1}</span>
              </div>
              <div className="release-details">
                <div>
                  <h3>{release.title}</h3>
                  <p>{release.artist}</p>
                </div>
                <span className="release-price">{release.price}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="sample-disclaimer">All three releases and prices are fictional examples, not available inventory.</p>
      </section>

      <section className="newsletter section-wrap" id="newsletter" aria-labelledby="newsletter-title">
        <div className="newsletter-copy">
          <p className="section-kicker">A little listening inspiration</p>
          <h2 id="newsletter-title">Leave room for a new favorite.</h2>
          <p>This email field is a visual test surface only. It does not subscribe or send anything.</p>
        </div>
        <div className="newsletter-field">
          <label htmlFor="newsletter-email">Your email address</label>
          <div className="input-shell">
            <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
            <span className="input-arrow" aria-hidden="true">↗</span>
          </div>
          <p className="field-caption">Demo input only. Your address is not saved or sent.</p>
        </div>
      </section>

      </main>

      <footer className="site-footer section-wrap" id="visit">
        <div className="footer-brand">
          <a className="wordmark" href="#top">
            <span className="wordmark-mark" aria-hidden="true">M</span>
            <span>music corner</span>
          </a>
          <p>Good records, good company.</p>
        </div>
        <div className="footer-details">
          <div>
            <h2>Come by</h2>
            <address>14 Sample Street<br />Portland, OR 97205</address>
          </div>
          <div>
            <h2>Open hours</h2>
            <p>Monday - Saturday<br />10am - 6pm</p>
          </div>
          <div>
            <h2>Say hello</h2>
            <a href="mailto:hello@musiccorner.example">hello@musiccorner.example</a>
          </div>
        </div>
        <p className="footer-disclaimer">Fictional demo store details. This page is a sample storefront, not a live shop.</p>
        <div className="footer-bottom"><span>Music Corner</span><span>Made for the love of listening</span></div>
      </footer>
    </>
  );
}
