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

