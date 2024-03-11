
import PostCard from './PostCard'

const PostList = ({posts}) => {
    // Sort the posts array based on the createAt time
    const sortedPosts = posts && posts.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

  return (
    sortedPosts && sortedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
    ))
  )
}

export default PostList
