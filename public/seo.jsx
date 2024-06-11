const Seo = ({ title, description, jsonLd }) => {
  if (!jsonLd || !title || !description) {
    return;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Seo;
