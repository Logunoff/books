import logoFacebook from '../../assets/images/facebook.svg';
import logoInstagram from '../../assets/images/instagram.svg';
import logoLinkedin from '../../assets/images/linkedin.svg';
import logoVk from '../../assets/images/vk.svg';

import './footer.css';

export const Footer = () => (
  <footer>
    <div className='footer__seporator' />
    <div className='footer__wrapper'>
      <p>© 2020-2023 Cleverland. Все права защищены.</p>
      <div className='footer__social-media'>
        <img src={logoFacebook} alt='facebook' />
        <img src={logoInstagram} alt='instagram' />
        <img src={logoVk} alt='vk' />
        <img src={logoLinkedin} alt='logoLinkedin' />
      </div>
    </div>
  </footer>
);
