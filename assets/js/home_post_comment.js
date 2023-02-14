class PostComments { 
    constructor(postId) { 
        this.postId = postId; 
        this.postContainer = $(`#post-${postId}`); 
        this.newCommentForm = $(`#post-${postId}-comments-form`); 
 
        this.createComment(postId); 
 
        let self = this; 
        // call for all the existing comments 
        $(' .delete-comment-button', this.postContainer).each(function () { 
            self.deleteComment($(this)); 
        }); 
    } 
 
    createComment(postId) { 
        
        let pSelf = this; 
        this.newCommentForm.submit(function (e) { 
            e.preventDefault(); 
            let self = this; 
 
            $.ajax({ 
                type: 'post', 
                url: '/comment/create', 
                data: $(self).serialize(), 
                success: function (data) { 
                    let newComment = pSelf.newCommentDom(data.data.comment); 
                    $(`#post-comments-${postId}`).prepend(newComment); 
                    pSelf.deleteComment($(' .delete-post-comment', newComment)); 
  
                    $(self).trigger("reset"); 
 
                }, error: function (error) { 
                    console.log(error.responseText); 
                } 
            }); 
 
 
        }); 
    } 
 
 
    newCommentDom(comment) { 
        // CHANGE :: show the count of zero likes on this comment 
        return $( 
            `<li id="comment-${comment._id}"> 
                <p> 
                    <small> 
                        <a class="delete-post-comment" href="/comment/destroy/${comment._id}" >Delete</a> 
                    </small> 
                    ${comment.content} 
                    <br> 
                    <small> 
                        ${comment.user.name} 
                    </small> 
                </p> 
            </li>` 
        ); 
    } 
 
 
    deleteComment(deleteLink) { 
        $(deleteLink).click(function (e) { 
            console.log(e);
            e.preventDefault(); 
            $.ajax({ 
                type: 'get', 
                url: $(deleteLink).prop('href'), 
                success: function (data) { 
                    $(`#comment-${data.data.commentid}`).remove();              
                }, error: function (error) { 
                    console.log(error.responseText); 
                } 
            }); 
        }); 
    } 
}
