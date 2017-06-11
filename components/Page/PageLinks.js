import { Bar } from '../';

export const PageLinks = () => (
  <Bar>
    <p className='page-links'>View on <a href="https://github.com/maisoumenos/dench">Github</a></p>

    <style jsx>{`
      .page-links > a {
        transition: box-shadow 200ms ease-in-out;
        box-shadow: inset 0 -0.4em rgba(0, 0, 0, 0.25);
      }

      .page-links > a:hover {
        box-shadow: inset 0 -0.6em rgba(0, 0, 0, 0.35);
      }
    `}</style>
  </Bar>
)

export default PageLinks;
