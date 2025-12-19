const PageTitle = ({ title }) => {
  return (
    <div>
      <h1 className="text-2xl bg-linear-to-r from-white to-black/70 bg-clip-text text-transparent font-bold text-center">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
