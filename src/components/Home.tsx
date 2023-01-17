import { CommentList } from "./CommentList";
import { MainVisual } from "./MainVisual";
import { Editor } from "./Editor";
import { Footer } from "./Footer";

export const Home = () => (
    <>
        <MainVisual />
        <Editor />
        <CommentList />
        <Footer />
    </>
);
