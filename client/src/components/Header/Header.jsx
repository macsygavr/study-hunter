// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   // Redirect,
// } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-dark bg-primary" style={{ padding: '0 55px', height: '60px', marginBottom: '60px' }}>
        <Link to="/">
          <div style={{ transform: 'scale(1)' }}>
            <svg width="320" height="55.124514580282074" viewBox="0 0 320 55.124514580282074" className="css-1j8o68f">
              <defs id="SvgjsDefs1001" />
              <g id="SvgjsG1007" featurekey="symbolFeature-0" transform="matrix(1.0016125509682108,0,0,1.0016125509682108,-0.08113062432982315,-22.51925478473415)" fill="#eeeeee">
                <g xmlns="http://www.w3.org/2000/svg">
                  <path d="M50,58.449l-20.73-6.771v14.335c5.538,4.844,12.78,7.786,20.714,7.788c0.006,0,0.011,0.002,0.016,0.002   c0.006,0,0.011-0.002,0.017-0.002c7.935-0.002,15.175-2.944,20.714-7.788V51.679L50,58.449z" />
                  <path d="M49.202,38.524c0.144-0.441,0.618-0.682,1.06-0.538l24.959,8.151c0.264,0.087,0.455,0.293,0.535,0.539l24.164-7.891   L50,22.483L0.081,38.785L50,55.087l23.605-7.708l-23.866-7.794C49.299,39.44,49.057,38.965,49.202,38.524z" />
                  <path d="M77.361,56.435c0-0.965-0.547-1.794-1.344-2.218l-0.217-7.281l-0.002-0.027c-0.002-0.08-0.02-0.158-0.043-0.233   l-2.15,0.703l0.496,0.162l-0.195,6.557c-0.93,0.372-1.586,1.276-1.586,2.338c0,1.007,0.594,1.869,1.447,2.273l-0.51,17.057   c0,0.031,0,0.068,0,0.102c0.029,0.939,0.812,1.678,1.754,1.65c0.938-0.029,1.678-0.812,1.648-1.752l-0.512-17.184   C76.873,58.138,77.361,57.346,77.361,56.435z" />
                </g>
              </g>
              <g id="SvgjsG1008" featurekey="nameFeature-0" transform="matrix(0.8031398139258777,0,0,0.8031398139258777,119.15292832887702,6.5551246241715955)" fill="#eeeeee"><path d="M9.7852 40.25391 c-1.849 -0.078125 -3.5547 -0.57291 -5.1172 -1.4844 c-1.7708 -1.0287 -2.9752 -2.4088 -3.6133 -4.1406 l3.9844 -1.4648 c0.32553 0.85938 0.99609 1.556 2.0117 2.0898 c0.89844 0.45572 1.875 0.70963 2.9297 0.76172 c1.6276 0.065098 2.9752 -0.33203 4.043 -1.1914 c0.89844 -0.72916 1.3737 -1.5625 1.4258 -2.5 c0.078125 -1.7838 -1.7904 -3.2096 -5.6055 -4.2773 c-5.9766 -1.6797 -8.8736 -4.5248 -8.6914 -8.5352 c0.11719 -2.8125 1.3216 -4.9154 3.6133 -6.3086 c1.7448 -1.0677 3.8412 -1.543 6.2891 -1.4258 c2.9688 0.13021 5.3516 1.1654 7.1484 3.1055 l-3.1055 2.8906 c-1.0156 -1.0938 -2.4283 -1.6797 -4.2383 -1.7578 c-1.276 -0.05209 -2.3633 0.11066 -3.2617 0.48826 c-1.4063 0.59896 -2.142 1.6667 -2.207 3.2031 c-0.078125 1.7578 1.7904 3.1705 5.6055 4.2383 c3.4375 0.96354 5.8725 2.3828 7.3047 4.2578 c0.98959 1.3021 1.4518 2.7408 1.3867 4.3164 c-0.10416 2.2135 -1.1068 4.0885 -3.0078 5.625 c-1.7708 1.4193 -3.8932 2.1289 -6.3672 2.1289 c-0.18229 0 -0.35807 -0.0065041 -0.52734 -0.019531 z M22.08985625 12.050999999999998 l0 4.2383 l5.918 0 l0 23.711 l4.2578 0 l0 -23.711 l5.918 0 l0 -4.2383 l-16.094 0 z M45.1172375 37.3437 c-1.9401 -1.9401 -2.9102 -4.2838 -2.9102 -7.0313 l0 -18.281 l4.2578 0 l0 18.281 c0 1.5755 0.55338 2.9166 1.6602 4.0234 c1.1198 1.1198 2.4609 1.6797 4.0234 1.6797 c1.5755 0 2.9166 -0.5599 4.0234 -1.6797 c1.1198 -1.1068 1.6797 -2.4479 1.6797 -4.0234 l0 -18.281 l4.2578 0 l0 18.281 c0 2.7475 -0.97656 5.0912 -2.9297 7.0313 c-1.9401 1.9401 -4.2838 2.9102 -7.0313 2.9102 c-2.7344 0 -5.0781 -0.97006 -7.0313 -2.9102 z M71.03518125 35.7812 l3.125 -0.000019073 c2.6822 0 4.9805 -0.95703 6.8945 -2.8711 c1.901 -1.901 2.8516 -4.1928 2.8516 -6.875 c0 -2.6953 -0.95053 -4.9936 -2.8516 -6.8945 c-1.9141 -1.9141 -4.2123 -2.8711 -6.8945 -2.8711 l-3.125 0 l0 19.512 z M66.81638125 39.999980927 l0 -27.949 l7.3438 0 c3.8541 0 7.1484 1.3672 9.8828 4.1016 c2.7213 2.7344 4.082 6.0287 4.082 9.8828 c0 3.8412 -1.3607 7.1289 -4.082 9.8633 c-2.7344 2.7344 -6.0287 4.1016 -9.8828 4.1016 l-7.3438 0 z M102.6173125 12.050999999999998 l-5.918 10.039 l-5.918 -10.039 l-4.9219 0 l8.7109 14.805 l0 13.145 l4.2578 0 l0 -13.145 l8.7109 -14.805 l-4.9219 0 z M135.42940625 12.050999999999998 l0 11.836 l-11.367 0 l0 -11.797 l-4.2383 0 l0 27.91 l4.2383 0 l0 -11.875 l11.367 0 l0 11.875 l4.2383 0 l0 -27.949 l-4.2383 0 z M147.24614375 37.3437 c-1.9401 -1.9401 -2.9102 -4.2838 -2.9102 -7.0313 l0 -18.281 l4.2578 0 l0 18.281 c0 1.5755 0.55338 2.9166 1.6602 4.0234 c1.1198 1.1198 2.4609 1.6797 4.0234 1.6797 c1.5755 0 2.9166 -0.5599 4.0234 -1.6797 c1.1198 -1.1068 1.6797 -2.4479 1.6797 -4.0234 l0 -18.281 l4.2578 0 l0 18.281 c0 2.7475 -0.97656 5.0912 -2.9297 7.0313 c-1.9401 1.9401 -4.2838 2.9102 -7.0313 2.9102 c-2.7344 0 -5.0781 -0.97006 -7.0313 -2.9102 z M185.1176875 12.050999999999998 l0 19.98 l-11.934 -19.98 l-4.4336 0 l0 27.949 l4.2383 0 l0 -19.98 l11.953 19.98 l4.4336 0 l0 -27.949 l-4.2578 0 z M192.8125125 12.050999999999998 l0 4.2383 l5.918 0 l0 23.711 l4.2578 0 l0 -23.711 l5.918 0 l0 -4.2383 l-16.094 0 z M212.71489375 12.050999999999998 l0 27.949 l14.258 0 l0 -4.2383 l-10.02 0 l0 -7.6563 l7.7344 0 l0 -4.2383 l-7.7344 0 l0 -7.5781 l10.02 0 l0 -4.2383 l-14.258 0 z M234.39454375 23.984 l0 -7.6953 l6.0742 0 c1.0547 0 1.9596 0.3776 2.7148 1.1328 c0.74219 0.75521 1.1133 1.6667 1.1133 2.7344 c0 1.0547 -0.37109 1.9531 -1.1133 2.6953 c-0.75521 0.75521 -1.6602 1.1328 -2.7148 1.1328 l-6.0742 0 z M243.63234375 27.578 c1.4583 -0.625 2.6367 -1.6015 3.5352 -2.9297 c0.92447 -1.3542 1.3867 -2.8516 1.3867 -4.4922 c0 -2.2396 -0.79428 -4.1471 -2.3828 -5.7227 c-1.5755 -1.5885 -3.4766 -2.3828 -5.7031 -2.3828 l-10.313 0 l0 27.949 l4.2383 0 l0 -11.777 l4.7852 0 l6.1133 11.777 l4.7852 0 z" /></g>
            </svg>
          </div>
        </Link>
        <Link to="/profile">ЛК </Link>
        <Link to="/signin">Вход </Link>
        <Link to="/signup">Регистрация </Link>
        <Link to="/logout">Выход </Link>
      </nav>
    </div>
  );
}
