import TopNav from "../Components/mini-components/TopNav/TopNav";
import AddPost from "./AddPost";
import AddedPost from "./AddedPost";

function Admin() {
  return (
    <>
      <TopNav />
      <h1>Add Post or Announcement.</h1>
      <AddPost />
      <AddedPost />
    </>
  );
}

export default Admin;
