export default {
  logo: <span className="font-display font-bold">Unidemy</span>,
  project: {
    link: "https://github.com/fardeenes7/unidemy",
  },
  docsRepositoryBase: "https://github.com/fardeenes7/unidemy",
  banner: {},
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return (
          <div style={{ fontWeight:"bold", textAlign: "left" }}>{title}</div>
        );
      }
      if (title === "About") {
        return <>❓ {title}</>;
      }
      return <>{title}</>;
    },
  },
};
