module.exports = function(io){

let array = []
let users = new Map()
let sockets= new Map();

io.on('connection', socket => {
console.log('a user connected');
  socket.on('user', (user) => {
  	users.has(user) ? users.get(user).push(socket.id) : users.set(user,[socket.id]);
  	console.log(users.get(user))
	sockets.set(socket.id, user);
  })
  
  socket.on('like', (target) => {
    users.get(target.toString()).forEach(socketId => {
    	io.to(socketId).emit('like')
    	io.emit("popularUser");
    	//socket.emit("like");
    })
  });
  
  socket.on('dislike', (target) => {
    users.get(target.toString()).forEach(socketId => {
    	io.to(socketId).emit('dislike')
    	io.emit("popularUser");
    	//socket.emit("like");
    })
  });
  
  socket.on('comment', (target) => {
    users.get(target.toString()).forEach(socketId => {
    	io.to(socketId).emit('comment')
    	io.emit("popularUser");
    	//socket.emit("like");
    })
  });
  
  socket.on('shared', () => {
  		io.emit("popularTopic");
  });
  
    
  socket.on('evet', (notification) => {
    console.log(notification)
	console.log("LLAAAAN")
    //req.notification = notification
    //app.use(notificationRouter);
  });
  
  socket.on('disconnect', (notification) => {
	var index = users.get(sockets.get(socket.id)).indexOf(socket.id)
	users.get(sockets.get(socket.id)).splice(index, 1)
	sockets.delete(socket.id)
  });
});
}



  


