import classnames from 'classnames';
import { element, string } from 'prop-types';

export const SVGIcon = ({ className, children }) => (
  <div className={classnames('icon', className)}>
    {children}
    <style jsx>{`
      .icon {
        display: inline-block;
        color: currentcolor;
      }

      .icon > :global(svg) {
        display: block;
        margin: 0;
      }
    `}</style>
  </div>
);

SVGIcon.displayName = 'Mooji.SVGIcon';

SVGIcon.defaultProps = {
  className: '',
};

SVGIcon.propTypes = {
  className: string,
  children: element.isRequired,
};

export default SVGIcon;
