import { PublicHeader } from "../components/PublicHeader.tsx";
import "../styles/HomePage.css";

export function HomePage() {
    return (
        <div className="home">
            <PublicHeader />
            <main className="home__main" />
        </div>
    );
}
