import { SVGIcon, ShortDate } from "..";

export const Footer = ({ startedOn, total }) => (
  <footer className="footer">
    <div className="footer__text">
      <p>
        A simple breakdown of {total} workouts since{" "}
        <ShortDate date={startedOn} /> using data from{" "}
        <a href="https://stronglifts.com/5x5/" target="_blank">
          Stronglifts 5x5
        </a>
        .
      </p>
    </div>

    <a href="http://maisoumenos.co" className="footer__logo">
      <SVGIcon>
        <SVGIcon.Mais height={174 / 1.25} width={176 / 1.25} />
      </SVGIcon>
    </a>

    <style jsx>{`
      .footer {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }

      .footer__text {
        margin-bottom: 8rem;
      }

      .footer__text p {
        max-width: 20em;
        font-size: 2rem;
        font-weight: 200;
        text-align: center;
      }

      .footer__text p a {
        white-space: nowrap;
        transition: box-shadow 200ms ease-in-out;
        box-shadow: inset 0 -0.4em rgba(255, 255, 255, 0.3);
      }

      .footer__text p a:hover {
        box-shadow: inset 0 -0.6em rgba(255, 255, 255, 0.5);
      }

      .footer__logo {
        opacity: 1;
        transition: opacity 300ms ease-in-out;
      }

      .footer__logo:hover {
        opacity: 0.2;
      }
    `}</style>
  </footer>
);

export default Footer;
