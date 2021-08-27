export default function Footer() {
  return (
    <div className="footer">
      <nav
        className="bg-primary footer__nav"
        style={{
          height: '80px', position: 'absolute', left: '0', right: '0',
        }}
      >
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
    </div>
  );
}
