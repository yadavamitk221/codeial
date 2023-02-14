{
    // method to submit the form data using ajax
    
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
               let newPost = newPostDOM(data.data.post);
               $('#post-list-container>ul').prepend(newPost);
               deletePost($(' .delete-post-button', newPost));
               new PostComments(data.data.post._id);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    
    // method to create the data in the dOM
    let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
                    <small>
                        <a class="delete-post-button" href="/post/destroy/${post._id}">Delete</a>
                    </small>
                    <p> ${post.content} </p>
                    <small>
                        ${ post.user.name}
                    </small>
                    <!-- Creating Comment -->
                    <div class="create-comment">
                        <form id="post-${post._id}-comments-form" action="/comment/create" method="POST">
                            <input type="text" name="content" placeholder="Add Comment" required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
                        <div class="post-comment-list">
                            <ul id="post-comments-${post._id }"></ul>
                        </div>
                    </div>
                </li>`)
    }

    // method to delete a post from dom 
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
        e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.postid}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let convertPostsToAjax = function () { 
        $("#post-list-container>ul>li").each(function () { 
          let self = $(this); 
          let deleteButton = $(" .delete-post-button", self); 
          deletePost(deleteButton); 
         
     
          // get the post's id by splitting the id attribute 
          let postId = self.prop("id").split("-")[1]; 
          new PostComments(postId);
        }); 
      };

    //   selectors
      let PosttoggleLike = $('.Postlikebtn');
      let CommenttoggleLike = $('.Commentlikebtn');

    //   EventListeners
    PosttoggleLike.click(togleLike);
    CommenttoggleLike.click(togleLike);
      
    function togleLike(e){
            e.preventDefault();
            console.log("Hello");
            $.ajax({
                type: 'post',
                url: likebtn.prop('href'),
                success: function(likeDeleted){
                    if(likeDeleted){
                        likebtn.html('Like 0');
                    }else{
                        likebtn.html('like 1');
                    }
                }, error: function(error){
                    console.log(error.responseText);
                }
            }); 
      }
     
       
      createPost(); 
      convertPostsToAjax();      
}

