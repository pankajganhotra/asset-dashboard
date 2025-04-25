export default function SearchBar({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by name or ID"
        className="w-full p-2 border rounded-md shadow-sm mb-4"
      />
    );
  }
