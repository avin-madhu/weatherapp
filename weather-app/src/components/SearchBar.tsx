// src/components/SearchBar.tsx
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center justify-center mb-6">
      <input
        type="text"
        placeholder="Enter city name..."
        className="w-64 p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-r-xl flex items-center gap-2"
      >
        <Search size={18} /> Search
      </button>
    </div>
  );
}
