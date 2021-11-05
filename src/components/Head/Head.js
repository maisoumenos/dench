import NextHead from "next/head";
import { string } from "prop-types";

export const Head = ({ description, title, url }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </NextHead>
);

Head.defaultProps = {
  title: "Dench",
  description: "A simple breakdown of workouts using data from Stronglifts 5x5",
  url: "https://dench.tombates.co",
};

Head.propTypes = {
  title: string,
  description: string,
  url: string,
};

export default Head;
