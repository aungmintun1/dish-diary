//  eslint-disable 
import '@babel/polyfill';
import {login} from './login';
import {createThread} from './createThread'
import {createComment} from './createComment'
import {createReply} from './createReply'
import {addThreadLike} from './addThreadLike'
import {addCommentLike} from './addCommentLike';
import {deleteThread} from './deleteThread';
import {updateThread} from './updateThread';
import {updateMe} from './updateMe';
import {favorite} from './Favorite';
import {editCart} from './editCart';
import {bookItem} from './stripe';
import {deleteCart} from './deleteCart'
import {addCart} from './addCart';

//components and or buttons containing eventlistener
const loginForm = document.querySelector('.form');
const createCommentBtn = document.querySelector('.submit-button');
const createReplyBtn = document.querySelectorAll('.submit-reply');
const threadLikeBtn = document.querySelector('.like-thread');
const commentLikeBtn = document.querySelectorAll('.like-comment');
const threadForm = document.querySelector('.thread-form');
const userForm = document.querySelector('.user-form');
const deleteThreadBtn = document.querySelector('.delete-btn');
const updateThreadBtn = document.getElementById('update');
const favoriteBtn = document.querySelector('.favorite-btn');
const addBtn = document.querySelectorAll('.add-btn');
const subtractBtn = document.querySelectorAll('.subtract-btn');
const checkoutBtn = document.querySelector('.checkout-btn');
const deleteCartBtn = document.querySelectorAll('.delete-item-btn')
const quantityBtn = document.querySelector('.product-content');
const addToCartBtn =  document.querySelector('.addToCart-btn');
const sizeBtnContainer = document.querySelector('.size-button-container');

//delegation
if(loginForm)
document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
      login(email,password);
  });

  if(threadForm)
  threadForm.addEventListener('submit', e => {
      e.preventDefault();

      const form = new FormData();
      form.append('question', document.getElementById('question').value);
      form.append('description', document.getElementById('description').value);
      form.append('ingredients', document.getElementById('ingredients').value);
      form.append('directions', document.getElementById('directions').value);
      form.append('photo', document.getElementById('photo').files[0]);

      createThread(form);
   });

   if(createCommentBtn)
   createCommentBtn.addEventListener('click', e => {
       e.preventDefault();   
    
       const comment = document.getElementById('comment').value;
       const thread= createCommentBtn.getAttribute('data-threadId');

         createComment(comment,thread);
    });


    if(createReplyBtn)
    createReplyBtn.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        
        const textareaBox = e.target.closest('.textarea-box');
        // selects textarea-box closest to the button
        const replyText = textareaBox.querySelector('.reply-input').value; 
        //now it selects the input of the reply-input that is in the same textareaBox as the button 

        const thread = button.getAttribute('data-threadId');
        const comment = button.getAttribute('data-commentId');
       
       createReply(replyText,thread,comment);
       
      });
    });

    if(threadLikeBtn)
    threadLikeBtn.addEventListener('click', e => {
        e.preventDefault();   
 
        const thread = threadLikeBtn.getAttribute('data-threadId');
 
          addThreadLike(thread);
     });


      if(commentLikeBtn)
      commentLikeBtn.forEach(button => {
        button.addEventListener('click', e => {
          e.preventDefault();
          
          const comment = button.getAttribute('data-commentId');
  
          addCommentLike(comment);
         
        });
      });

      if(deleteThreadBtn)
      deleteThreadBtn.addEventListener('click', e => {
          e.preventDefault();   
   
          const threadId = deleteThreadBtn.getAttribute('data-threadId');
   
            deleteThread(threadId);
       });

       
      if(updateThreadBtn)
      updateThreadBtn.addEventListener('click', e => {
          e.preventDefault();   
   
          const threadId = updateThreadBtn.getAttribute('data-threadId');
          const question = document.getElementById('question').value;
          const ingredients = document.getElementById('ingredients').value;
          const description = document.getElementById('description').value;
          const directions = document.getElementById('directions').value;

            updateThread(threadId,question,ingredients,description,directions);
       });

       if(userForm)
       userForm.addEventListener('submit', e => {
           e.preventDefault();

           console.log('user form clicked')
     
           const form = new FormData();
           form.append('name', document.getElementById('name').value);
           form.append('email', document.getElementById('email').value);
           const photoInput = document.getElementById('photo');

           if (photoInput.files.length > 0) { form.append('photo', photoInput.files[0]); }
           // if there is a photo input then append the new input, else it will keep the old photo
     
           updateMe(form);
        });

        if(favoriteBtn)
        favoriteBtn.addEventListener('click', e => {
            e.preventDefault();   
     
            const thread = favoriteBtn.getAttribute('data-threadId');
     
              favorite(thread);
         });

         if(addBtn)
         addBtn.forEach(button => {
           button.addEventListener('click', e => {
             e.preventDefault();
       
             const productId = button.getAttribute('data-productId');
             const quantity = Number(button.getAttribute('data-quantity')); 

             const newQuantity = quantity+1;

             editCart(productId, newQuantity)
           });
         }); 

         if(subtractBtn)
         subtractBtn.forEach(button => {
           button.addEventListener('click', e => {
             e.preventDefault();
       
             const productId = button.getAttribute('data-productId');
             const quantity = Number(button.getAttribute('data-quantity')); 

             const newQuantity = quantity-1;

             editCart(productId, newQuantity)
           });
         }); 

         if(checkoutBtn)
         checkoutBtn.addEventListener('click', e => {

          bookItem();
          
        });

        if(deleteCartBtn)
        deleteCartBtn.forEach(button => {
          button.addEventListener('click', e => {
            e.preventDefault();
      
            const productId = button.getAttribute('data-productId');

            deleteCart(productId);
          });
        }); 

        if(quantityBtn)
         {

            const addQuantityBtn = document.querySelector('.atc-add-btn');
            const subtractQuantityBtn= document.querySelector('.atc-subtract-btn');
            let quantityCounter = document.querySelector('.atc-quantity');

            addQuantityBtn.addEventListener('click', e => {
              let currentValue = parseInt(quantityCounter.textContent);
              quantityCounter.textContent = currentValue + 1;
            })

            subtractQuantityBtn.addEventListener('click', e => {
              let currentValue = parseInt(quantityCounter.textContent);

              if(currentValue > 1)
              quantityCounter.textContent = currentValue - 1;

            })
         };

         /*
         if(addToCartBtn){
         addToCartBtn.addEventListener('click', e => {
             e.preventDefault();   
             
             let quantityCounter = document.querySelector('.atc-quantity');
             let currentQuantity = parseInt(quantityCounter.textContent);

             const productId = addToCartBtn.getAttribute('data-productId');

             addCart(productId,currentQuantity)
             
          });
        }

          if(sizeBtnContainer){

           const sizeBtns= document.querySelectorAll('.size-btn')
           sizeBtns.forEach(button => {
            let size = 'small';
            sizeBtns[0].style.backgroundColor = 'rgb(240, 189, 95)';

            button.addEventListener('click', e => {
             
              size = button.getAttribute('data-size');
              console.log('selection is ' + size)

              if(size === "small"){
                sizeBtns[0].style.backgroundColor = 'rgb(240, 189, 95)';
                sizeBtns[1].style.backgroundColor = '#EFEFEF';
                sizeBtns[2].style.backgroundColor = '#EFEFEF';
              }
              if(size === "medium"){
                sizeBtns[0].style.backgroundColor = '#EFEFEF';
                sizeBtns[1].style.backgroundColor = 'rgb(240, 189, 95)';
                sizeBtns[2].style.backgroundColor = '#EFEFEF';
              }
              if(size === "large"){
                sizeBtns[0].style.backgroundColor = '#EFEFEF';
                sizeBtns[1].style.backgroundColor = '#EFEFEF';
                sizeBtns[2].style.backgroundColor = 'rgb(240, 189, 95)';
              }
            })

           })
          }
        */

  //test code 

  if(addToCartBtn){
    let size = 'small';
    if(sizeBtnContainer){

      const sizeBtns= document.querySelectorAll('.size-btn')
      sizeBtns.forEach(button => {
       
       sizeBtns[0].style.backgroundColor = 'rgb(240, 189, 95)';

       button.addEventListener('click', e => {
        
         size = button.getAttribute('data-size');
         console.log('selection is ' + size)

         if(size === "small"){
           sizeBtns[0].style.backgroundColor = 'rgb(240, 189, 95)';
           sizeBtns[1].style.backgroundColor = '#EFEFEF';
           sizeBtns[2].style.backgroundColor = '#EFEFEF';
         }
         if(size === "medium"){
           sizeBtns[0].style.backgroundColor = '#EFEFEF';
           sizeBtns[1].style.backgroundColor = 'rgb(240, 189, 95)';
           sizeBtns[2].style.backgroundColor = '#EFEFEF';
         }
         if(size === "large"){
           sizeBtns[0].style.backgroundColor = '#EFEFEF';
           sizeBtns[1].style.backgroundColor = '#EFEFEF';
           sizeBtns[2].style.backgroundColor = 'rgb(240, 189, 95)';
         }
       })

      })
     }
   
    addToCartBtn.addEventListener('click', e => {
        e.preventDefault();   
        
        let quantityCounter = document.querySelector('.atc-quantity');
        let currentQuantity = parseInt(quantityCounter.textContent);
        const productId = addToCartBtn.getAttribute('data-productId');


        if(!sizeBtnContainer){
          size = false;
          console.log('there is no size')
        }
        
        addCart(productId,currentQuantity,size)
        
     });
   }

   