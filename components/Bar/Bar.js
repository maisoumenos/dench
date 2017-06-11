export const Bar = ({ children }) => (
  <div className="bar">
    {children}
    <style jsx>{`
      .bar {
        align-items: center;
        color: #070707;
        background: #FFF;
        display: flex;
        justify-content: center;
        padding: 18px 24px;
      }

      .bar > :global(p) {
        font-size: 18px;
      }

      @media (max-width: 650px) {
        .bar > :global(*) {
          max-width: 18em;
        }

        .bar > :global(p) {
          font-size: 16px;
          text-align: center;
        }
      }
    `}</style>
  </div>
)

export default Bar;
