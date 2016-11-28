function handleFollowBtnClick(evt){
  var artistID = document.getElementById('artistID').innerHTML;
  var followBtn = document.getElementById('followBtn');
  var url = '/api/follow';
  var req = new XMLHttpRequest();
  var data = 'artistID=' + artistID;
  req.open('PUT', url, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  req.addEventListener('load', function(){
    if (req.status >= 200 && req.status < 400){
      followBtn.innerHTML = "Following";
    }
  });
  
  req.send(data);
}
