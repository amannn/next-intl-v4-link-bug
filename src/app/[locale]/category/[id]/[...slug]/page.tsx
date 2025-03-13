const CategoryPage = async (props: {
  params: Promise<{
    locale: string;
    id: string;
    slug: string[] | string;
  }>;
}) => {
  const params = await props.params;

  return (
    <>
      <h1>
        Category {params.id} {params.slug}
      </h1>
    </>
  );
};

export default CategoryPage;
