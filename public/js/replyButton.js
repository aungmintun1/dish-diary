const replyIcons = document.querySelectorAll('.reply-icon');

// Iterate over each reply icon.
replyIcons.forEach(function(replyIcon) {
  replyIcon.addEventListener('click', function() {
   
    // Use 'closest' to find the nearest ancestor with the class '.comment-box'.
    const commentBox = this.closest('.comment-box');

    // Within the comment box, find the specific '.textarea-box'.
    const textareaBox = commentBox.querySelector('.textarea-box');

    textareaBox.style.display = textareaBox.style.display === 'block' ? 'none' : 'block';
     // Toggle the display style between 'block' and 'none'.
     //if block display none, else display block

  });
});
