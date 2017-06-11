export const PageSection = ({ children }) => (
  <section className="page-section">
    {children}
    <style jsx>{`
      .page-section {
        padding: 8rem 24px;
      }
    `}</style>
  </section>
)

export default PageSection;
