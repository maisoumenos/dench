export const Page = ({ children }) => (
  <div className="page">
    {children}
    <style global jsx>{`
      html,
      body{
        background-color: #070707;
        font-size: 16px;
      }

      body {
        color: #FFF;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        line-height: 1.5;
      }

      *,
      *::after,
      *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      a {
        color: currentColor;
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default Page;
