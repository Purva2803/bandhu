import { CreatePost } from "./createPost";

export const HomePage = () => {

    return (
        <div className="App">
            <header className="App-header">
                <h1>Bandhu</h1>

            </header>
            <nav>
                <h1>login</h1>
                <h1>signup</h1>
                <CreatePost/>
            </nav>
        </div>

    );
}