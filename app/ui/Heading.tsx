type HeadingProps = {
  children: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return <h1 className="text-2xl my-10">{children}</h1>;
};

export default Heading;
