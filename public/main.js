window.addEventListener('load',function() {

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('msgToClient', (data) => {
        console.log('Message from server:', data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    const form = document.querySelector('form');
    form.addEventListener('submit',async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            const data=await response.json();
            if  (data.success_token) {
                console.log('Emitiendo msg al servidor', { user: username });
                socket.emit('msg', { user: username });
            }
            if (!response.ok) {
                throw new Error('Error de login');
            }



        } catch (error) {
            alert('Error al iniciar sesión:'+ error.message);
        }
    });

});  