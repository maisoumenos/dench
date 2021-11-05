import { iconDefaultProps, iconPropTypes } from './PropTypes';

const KeyRight = ({ width, height }) => (
  <svg fill="currentcolor" height={height} viewBox="0 0 24 24" width={width}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>
);

KeyRight.displayName = 'Mooji.SVGIcon.KeyRight';
KeyRight.propTypes = iconPropTypes;
KeyRight.defaultProps = iconDefaultProps;

export default KeyRight;
