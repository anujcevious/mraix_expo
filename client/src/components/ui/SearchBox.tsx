import { BsSearch } from "react-icons/bs";

const SearchBox = ({ className }: any) => {
  return (
    <div className={` ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-purple-500 text-xxs"
        />
        <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBox;
