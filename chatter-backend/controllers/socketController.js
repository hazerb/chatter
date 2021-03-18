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
  	if(users.get(target.toString()) != undefined){
  		users.get(target.toString()).forEach(socketId => {
    		io.to(socketId).emit('like')
    	})
    }
    io.emit("popularUser");
  });
  
  socket.on('notLike', () => {
    	io.emit("popularUser");
  })

  
  socket.on('dislike', (target) => {
    if(users.get(target.toString()) != undefined){
  		users.get(target.toString()).forEach(socketId => {
    		io.to(socketId).emit('dislike')
    	})
    }
    io.emit("popularUser");
  });
  
   socket.on('notDislike', () => {
    	io.emit("popularUser");
    	//socket.emit("like");
    })
 
  
  socket.on('comment', (target) => {
    if(users.get(target.toString()) != undefined){
  		users.get(target.toString()).forEach(socketId => {
    		io.to(socketId).emit('comment')
    	})
    }
    io.emit("popularUser");
  });
  
  socket.on('shared', () => {
  		io.emit("popularTopic");
  });
  

  socket.on('disconn', () => {
  	if(users.get(sockets.get(socket.id)) != undefined){
		var index = users.get(sockets.get(socket.id)).indexOf(socket.id)
		users.get(sockets.get(socket.id)).splice(index, 1)
		sockets.delete(socket.id)
	}
  });
  
  socket.on('disconnect', () => {
	if(users.get(sockets.get(socket.id)) != undefined){
		var index = users.get(sockets.get(socket.id)).indexOf(socket.id)
		users.get(sockets.get(socket.id)).splice(index, 1)
		sockets.delete(socket.id)
	}
  });
});
}



  


