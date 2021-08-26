export default function Footer() {
  return (
    <did className="footer">
      <nav className="bg-primary footer__nav">
        <h4>Наши контакты:</h4>
        <div>
          <span style={{ marginRight: '20px' }}>Учебным заведениям</span>
          <span>Правовая информация</span>
        </div>
        <div>
          <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-128.png" alt="tw" width="40px" />
          <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Vimeo2_colored_svg-128.png" alt="vi" width="40px" />
          <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-128.png" alt="in" width="40px" />
        </div>
      </nav>
    </did>
  );
}
