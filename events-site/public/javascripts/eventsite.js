function handleFollowBtnClick(evt){
  var artistID = document.getElementById('artistID').innerHTML;
  var followBtn = document.getElementById('followBtn');
  var url, method;

  
  if (followBtn.value === 'follow'){
    url = '/api/follow';
    method = 'PUT';
  } else {
    url = '/api/unfollow';
    method = 'DELETE';
  }

  var req = new XMLHttpRequest();
  var data = 'artistID=' + artistID;
  req.open(method, url, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  req.addEventListener('load', function(){
    if (req.status >= 200 && req.status < 400){
      if (followBtn.value === 'follow'){
        followBtn.textContent = 'Unfollow';
        followBtn.value = 'unfollow'
      } else {
        followBtn.textContent = 'Follow';
        followBtn.value = 'follow';
      }
    } else if (req.status == 401){
      //TODO: redirect to login page
    } else {
      //TODO: 
    }

  });
  
  req.send(data);
}

function activateMemeMode(){
  var aesthetic = '/stylesheets/aesthetic.css';
  $('#theme_customizations').attr('href',aesthetic);
  $('body').prepend('<h3 style=\'text-align: center;\'>A E S T H E T I C</h3>');
  $('body').append('<p>This site is best viewed on a 800x600 screen<p>');
  $('body').append('<p>Optimized for Internet Explorer 4.0</p>');
  $('#memes').hide();
}
