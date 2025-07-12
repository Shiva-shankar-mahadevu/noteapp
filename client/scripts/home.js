fetch('../details').then(data=>data.json()).then(data=>{
    const {user}=data
    const {username,src}=user
    document.querySelector('#username').innerHTML=username
    if(src)
        document.querySelector('#profilePic').src=src
})
window.onload=()=>{
    document.querySelector('.profile-card').style.display='none'
fetch('../addPost').then(data=>data.json()).then(data=>{
    const {posts,users}=data
    posts.reverse()
    posts.forEach(post => {
        let postQuery={}
        postQuery.id=post._id
        postQuery.content=post.content
        postQuery.createdAt=post.createdAt
        postQuery.likes=post.likedBy.length
        for(let user of users){
            if(user._id===post.author){
                postQuery.author=user.username
                if(user.src!=="")
                    postQuery.src=user.src
                else
                    postQuery.src='https://th.bing.com/th/id/OIP.SXkUwphMyUJ5U4OgehuHBQHaHc?w=186&h=187&c=7&r=0&o=5&pid=1.7'
                break
            }
        }
        
        createPost(postQuery)
    })
})
}
const clickedPost=(e)=>{
    document.querySelector('form').style.display='block'
    e.target.style.display='none'
}
function createPost({author,content,likes,createdAt,id,src}){
    const Post=`<br>
    <div class="social-post">
    <div class="post-id" style="opacity:0">${id}</div>
    <div class="header">   <img class="profile-pic" src=${src}><div class="author" onclick="getAuthor(event)">${author}</div>        </div>
    <hr>
    <div class="content">${content}</div>
  
    <div class="likes" onclick="incrementLikes(event)">${likes} Likes</div>
    <div class="posted-date">Posted on :${createdAt.slice(0,10)}</div>
    </div>`
    document.querySelector('#postSection').innerHTML+=Post
}
function getAuthor(e){
    const username=e.target.innerText
    fetch(`../details/${username}`).then(data=>data.json()).then(data=>{
        let {src,noOfPostsLiked}=data
        document.querySelector('.profile-card').style.display='block'
        document.querySelector('.profile-card .profile-info .profile-name').innerText=username
        if(src) 
            document.querySelector('.profile-card .profile-picture').src=src
        else
            document.querySelector('.profile-card .profile-picture').src="https://th.bing.com/th/id/OIP.SXkUwphMyUJ5U4OgehuHBQHaHc?w=186&h=187&c=7&r=0&o=5&pid=1.7"
        document.querySelector('.no-of-posts-liked').innerText=`Total posts liked:${noOfPostsLiked}`
    })
}
function incrementLikes(e){
    const _id=e.target.parentNode.querySelector('.post-id').innerText
    const data={_id:_id}
 
    console.log('data',data)
    fetch('../details/likes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data) 
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        window.location.href='/'
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}