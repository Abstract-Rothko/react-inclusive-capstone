import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => (
                    <li key={item.label}>
                        {index === items.length - 1 || !item.to
                            ? <span aria-current="page">{item.label}</span>
                            : <Link to={item.to}>{item.label}</Link>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}