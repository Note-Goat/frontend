export default function Header({ title }) {
  return (
    <div>
      <header className="App-header">
        <img className="logo" src="/goat-original.png" />
        <h1 className="header">{title}</h1>
      </header>
    </div>
  );
}
