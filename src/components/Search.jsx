export default function TodoSearch({ searchTerm, setSearchTerm }) {
    return (
        <div className="todo__search">
            <input 
                type="text" 
                placeholder="검색" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="todo__search-input" 
            />
        </div>
    );
}