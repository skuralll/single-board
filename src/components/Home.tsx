import { CommentList } from "./CommentList";
import { MainVisual } from "./MainVisual";
import { Editor } from "./Editor";
import { Footer } from "./Footer";
import { CommentsProvider } from "../contexts/commentsContext";

export const Home = () => (
    <>
        <CommentsProvider>
            <MainVisual />
            <Editor />
            <CommentList />
            <Footer />
        </CommentsProvider>
    </>
);
